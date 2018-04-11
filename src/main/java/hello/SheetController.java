package hello;

import org.springframework.web.bind.annotation.*;

import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

/**
 * Created by Ashwin on 2/15/18.
 */
@CrossOrigin
@RestController
public class SheetController {


    /*
     * TYPE: POST
     * add new sheet. For now this only takes in username and sheet name and fills in
     * data column with empty string
     * ex: http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/addSheet?username=<user>&name=<name>
     * returns {"response": "Error: sheet already exists"} if sheet already exists
     */
    @RequestMapping(value = "/addSheet", method = RequestMethod.POST)
    public Response addSheet(@RequestParam(value="username", defaultValue="na") String username,
                          @RequestParam(value="name", defaultValue="na") String name) {
        Connection con = DBConnect.requestConnection();
        String timeStamp = Long.toString(System.currentTimeMillis());
        try {
            ResultSet set = DBConnect.executeRetrieve("SELECT * FROM SheetsDB.Sheets WHERE username = '" + username + "' AND title = '" + name + "';", con);
            while (set.next()) {
                con.close();
                return new Response("Error: sheet already exists");
            }
            DBConnect.executeUpdate("INSERT INTO SheetsDB.Sheets (username, title, data, createdDate) VALUES " +
                    "('" + username + "','" + name + "','" + "" + "','" + timeStamp + "');", con);
            con.close();
            return new Response("Success");
        } catch (Exception e) {
            System.out.print(e);
        }
        return new Response("Failure");
    }

    /*
     * TYPE: GET
     * returns json with list identified by {"names": [...], "dates": [...]} with the dates being in the same order as names and null if not present for that name
     * Date Format: YYYY-MM-DD
     * ex: http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/getSheets?username=<user>
     * returns:
     * {
     *   "names": [
     *       "calendar",
     *       "somethingElse"
     *   ],
     *   "dates": [
     *       null,
     *       "2018-02-27"
     *   ]
     * }
     */
    @RequestMapping("/getSheets")
    public SheetMetadata getSheets(@RequestParam(value="username", defaultValue="na") String username) {
        Connection con = DBConnect.requestConnection();
        List<String> toret = new ArrayList<>();
        List<String> dates = new ArrayList<>();
        try {
            ResultSet set = DBConnect.executeRetrieve("SELECT title, createdDate FROM SheetsDB.Sheets where " +
                    "username = '" + username + "';", con);
            while (set.next()) {
                toret.add(set.getString("title"));
                dates.add(set.getString("createdDate"));
            }
            con.close();
        } catch (Exception e) {
            System.out.print(e);
        }
        return new SheetMetadata(toret, dates);
    }

    public class SheetMetadata {
        private List<String> names;
        private List<String> dates;

        public SheetMetadata(List<String> names, List<String> dates) {
            this.names = names;
            this.dates = dates;
        }

        public List<String> getNames() {
            return names;
        }

        public List<String> getDates() {
            return dates;
        }
    }

    /*
     * TYPE: GET (made it a GET because there's no need for a body, just params)
     * ex: http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/renameSheet?username=<user>&title=<title>&newtitle=<newtitle>
     * returns response: Success/Error
     */
    @RequestMapping("/renameSheet")
    public Response renameSheet(@RequestParam(value="username", defaultValue="na") String username,
                                  @RequestParam(value="title", defaultValue = "na") String title,
                                  @RequestParam(value="newtitle", defaultValue = "na") String newtitle) {
        Connection con = DBConnect.requestConnection();
        try {
            DBConnect.executeUpdate("UPDATE SheetsDB.Sheets SET title = '" + newtitle + "' WHERE username = '" + username + "' AND title = '" + title + "';", con);
            con.close();
            return new Response("Success");
        } catch (Exception e) {
            System.out.print(e);
        }
        return new Response("Error");
    }

    /*
     * TYPE: GET (made it a GET because there's no need for a body, just params)
     * ex: http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/deleteSheet?username=<user>&title=<title>
     * returns response: Success/Error
     */
    @RequestMapping("/deleteSheet")
    public Response deleteSheet(@RequestParam(value="username", defaultValue="na") String username,
                                @RequestParam(value="title", defaultValue = "na") String title) {
        Connection con = DBConnect.requestConnection();
        try {
            DBConnect.executeUpdate("DELETE FROM SheetsDB.Sheets WHERE username = '" + username + "' AND title = '" + title + "';", con);
            con.close();
            return new Response("Success");
        } catch (Exception e) {
            System.out.print(e);
        }
        return new Response("Error");
    }

    /*
     * TYPE: POST
     * update data of a sheet
     * request parameters: username, title
     * updates the data of the sheet with the json in the request body
     * ex: http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/updateData?username=<user>&title=<title>
     *    Request Body: {...}
     *
     * returns response: Success/Error
     */
    @RequestMapping(value = "/updateData", method = RequestMethod.POST, consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public Response updateData(@RequestBody String data, @RequestParam(value="username", defaultValue = "na") String username,
                                  @RequestParam(value="title", defaultValue = "na") String title) {
        Connection con = DBConnect.requestConnection();
        try {
            DBConnect.executeUpdate("UPDATE SheetsDB.Sheets SET data = '" + data + "' WHERE username = '" + username + "' AND title = '" + title + "';", con);
            con.close();
            return new Response("Success");
        } catch (Exception e) {
            System.out.print(e);
            return new Response("Error");
        }
    }

    /*
     * TYPE: GET
     * returns json with the data contained in that sheet, empty string if no data in the sheet, and the String "Error" for an error
     * parameters: username, title
     * ex: http://default-environment.c2nuqptw9f.us-east-2.elasticbeanstalk.com/getData?username=<username>&title=<title>
     */
    @RequestMapping(value = "/getData", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public String getData(@RequestParam(value="username", defaultValue = "na") String username,
                               @RequestParam(value="title", defaultValue = "na") String title) {
        Connection con = DBConnect.requestConnection();
        try {
            ResultSet set = DBConnect.executeRetrieve("SELECT data FROM SheetsDB.Sheets where " +
                    "username = '" + username + "' AND title = '" + title + "';", con);
            while (set.next()) {
                return set.getString("data");
            }
            con.close();
            return "";
        } catch (Exception e) {
            System.out.print(e);
            return "Error";
        }
    }

}