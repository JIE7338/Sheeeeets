import React, { Component } from 'react';


const SingleInputModal = class extends Component {
    constructor(...args) {
        super(...args);
        this.handleHideModal = this.handleHideModal.bind(this);
        this.handleSubmitModal = this.handleSubmitModal.bind(this);
        this.handleInputChangeModal = this.handleInputChangeModal.bind(this);
    }

    handleHideModal() {
        this.props.hideModal();
    }
    handleInputChangeModal(event) {
        this.props.changeInput(event.target.value);
    }
    handleSubmitModal() {
        this.props.submitModal();
    }


    render() {
        const activeClass = (this.props.isActive) ? 'modal is-active' : 'modal';
        const errorMessage = (this.props.error) ?
            <div className='has-text-danger is-size-7 has-text-weight-bold'>
                {this.props.error}
            </div>
            : null;
        return <div className={activeClass}>
            <div className='modal-background' onClick={this.handleHideModal}>
            </div>

            <div className='modal-card'>
                <header className='modal-card-head'>
                    <p className='modal-card-title'>{this.props.title}</p>
                </header>

                <section className='modal-card-body'>
                    <form>
                        <div className='field'>
                            <label className='label'>{this.props.label}</label>
                            <div className='control'>
                                <input className='input'
                                    name='value'
                                    type='textbox'
                                    value={this.props.value}
                                    onChange={this.handleInputChangeModal} />
                            </div>
                        </div>
                    </form>
                </section>
                <footer className='modal-card-foot'>
                    <button onClick={this.handleSubmitModal} className='button is-primary'>Submit</button>
                    <button onClick={this.handleHideModal} className='button'>Cancel</button>
                    {errorMessage}
                </footer>
            </div>
            <button onClick={this.handleHideModal} className='modal-close is-large' aria-label='close'></button>
        </div>;
    }
}
export default SingleInputModal;
