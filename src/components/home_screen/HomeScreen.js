import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { updateNewList} from '../../store/database/asynchHandler'

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
      }
    handleNewList = () => {
        let object = {
            "name": "Unknown",
            "owner": "Unknown",
            "items": [],
            "last_updated": new Date()
        }
        // this.props.todoLists.push(object);

        const { props, state } = this;
        const { firebase } = props;

        props.registerNewList(this.props.todoLists, firebase, object, this.props.history);

    }

    

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4" >
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        <br></br>
                        <div className="home_new_list_container center">
                                <button className="home_new_list_button waves-effect waves-lighten" onClick={this.handleNewList}>
                                    Create a New To Do List
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth
    };
};

const mapDispatchToProps = dispatch => ({
    registerNewList: (todoList, firebase, object, history) => dispatch(updateNewList(todoList, firebase, object, history)),
  });

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'todoLists', orderBy: ['last_updated', 'desc']},
    ]),
)(HomeScreen);