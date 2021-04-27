
import React, { Component } from 'react';


export default  class DeleteAcc extends Component {
    render() {
       
            
        
        return (
            <form onSubmit={this.handleSubmit}>
                <h7 className='h7' ><span role="img" aria-label="arrow">😭</span>Are you sure you want to delete your account?</h7>
                <div className = "formBtn">
                <button className = "btn btn-primary btn-block">Yes,delete my account immidiatly!</button>
                </div>
            </form>
          );
            
        
    }
}
