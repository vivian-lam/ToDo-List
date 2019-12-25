import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { updateTop} from '../../store/database/asynchHandler'


class TodoListCard extends React.Component {
    moveToTop =() => {
        this.props.todoList['last_updated'] = new Date();
    
        const { props, state } = this;
        const { firebase } = props;

        props.registerTop(this.props.todoLists, firebase, this.props.todoList);
    }
    render() {
        const { todoList } = this.props;
        console.log("TodoListCard, todoList.id: " + todoList.id);
        return (
            
            <div className="card z-depth-0 todo-list-link blue-grey darken-1 " onClick = {this.moveToTop}>
                <div className="card-content white-text text-darken-3 ">
                    <span className="card-title center waves-effect waves-light">{todoList.name} </span>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    registerTop: (listOfLists, firebase, todoList) => dispatch(updateTop(listOfLists, firebase, todoList)),
  });

export default compose(
    connect(null, mapDispatchToProps),
    firestoreConnect([
      { collection: 'todoLists', orderBy: ['last_updated', 'desc']},
    ]),
)(TodoListCard);
