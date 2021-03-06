import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { bookActions } from '../../actions';
import { NotePreviewCard, MessageBox, LoadingSpinner } from '../components';

class AllNotesContainer extends Component {
  componentDidMount() {
    this.props.getAllNotes({ perPage: 0 });
  }

  render() {
    return (
      <Grid container spacing={16}>
        {this.props.dbReqStarted ? <LoadingSpinner /> : ''}
        {this.props.dbReqFinished ? (
          this.props.allNotes.length ? (
            this.props.allNotes.map(note => (
              <NotePreviewCard key={note._id} {...note} />
            ))
          ) : (
            <MessageBox emoji="(｡•́︿•̀｡)" message="No note found" />
          )
        ) : (
          ''
        )}
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    allNotes: state.bookReducer.allNotes,
    dbReqStarted: state.bookReducer.dbReqStarted,
    dbReqFinished: state.bookReducer.dbReqFinished,
  };
};

const mapActionsToProps = {
  getAllNotes: bookActions.getAllNotes,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AllNotesContainer);
