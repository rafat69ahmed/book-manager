import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Grid,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import {
  Image,
  Container,
  PaddedPaper,
  InfoCaption,
  CustomButton,
  CustomTypography,
  ImageThumbContainer,
  RawHtmlViewr,
} from '../base-kits';
import QuillEditor from './quill-editor';
import { bookActions } from '../../actions';
import { PencilIcon } from 'mdi-react';
import bmPlaceholderImage from '../../assets/img/bm-image-placeholder.svg';

const EditBookLink = props => <Link {...props} />;

class SingleBookPreviewCard extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.showEditorDialog = this.showEditorDialog.bind(this);
    this.hideEditorDialog = this.hideEditorDialog.bind(this);
    this.handleSaveNote = this.handleSaveNote.bind(this);
  }

  componentDidMount() {
    this.props.getBookById(this.props.id);
  }

  handleDelete() {
    this.props.deleteBook(this.props.book._id);
  }

  showEditorDialog() {
    if (this.props.book.note) {
      this.props.setEditorContent(this.props.book.note);
    } else {
      this.props.resetEditorContent();
    }
    this.props.showEditorDialog();
  }

  hideEditorDialog() {
    this.props.resetEditorContent();
    this.props.hideEditorDialog();
  }

  handleSaveNote() {
    let bookWithNote = { ...this.props.book, note: this.props.editorContent };
    this.props.addNote(bookWithNote);
  }

  render() {
    const {
      coverImage,
      title,
      author,
      translator,
      publisher,
      categories,
      readingStatus,
      description,
      note,
    } = this.props.book;

    if (this.props.bookDeleted) {
      return <Redirect to="/all-books" />;
    }

    const generateReadingStatus = function(status) {
      switch (status) {
        case 'completed':
          return 'Completed';
        case 'reading':
          return 'Reading';
        default:
          return 'Not Started';
      }
    };

    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <PaddedPaper square>
            <Container p={16}>
              <Grid container>
                <Grid item xs={8}>
                  <Grid container spacing={16}>
                    <Grid item xs={6}>
                      <InfoCaption>Title</InfoCaption>
                      <Typography variant="h6" color="primary">
                        {title}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <InfoCaption>Publisher</InfoCaption>
                      <Typography variant="h6" color="primary">
                        {publisher}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <InfoCaption>Author</InfoCaption>
                      <Typography variant="h6" color="primary">
                        {author}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <InfoCaption>Categories</InfoCaption>
                      <Typography variant="h6" color="primary">
                        {categories || 'Uncategorized'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <InfoCaption>Translator</InfoCaption>
                      <Typography variant="h6" color="primary">
                        {translator || 'None'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <InfoCaption>Reading Status</InfoCaption>
                      <Typography variant="h6" color="primary">
                        {generateReadingStatus(readingStatus)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <InfoCaption>Description</InfoCaption>
                      <CustomTypography variant="body1" whitespace="pre-line">
                        {description}
                      </CustomTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <InfoCaption>
                        Note{' '}
                        <IconButton
                          aria-label="Take note"
                          disableRipple={true}
                          onClick={this.showEditorDialog}
                        >
                          <PencilIcon size={16} />
                        </IconButton>
                      </InfoCaption>
                      <RawHtmlViewr
                        dangerouslySetInnerHTML={{
                          __html: note || '<p>Add a note.</p>',
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container spacing={16} align="right">
                    <Grid item xs={12}>
                      <ImageThumbContainer height="450" width="300">
                        <Image
                          src={coverImage ? coverImage : bmPlaceholderImage}
                          width={coverImage ? '' : 100}
                        />
                      </ImageThumbContainer>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Container align="right" mt={32}>
                    <CustomButton
                      variant="contained"
                      color="secondary"
                      size="small"
                      mr="16"
                      onClick={this.handleDelete}
                    >
                      Delete
                    </CustomButton>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      component={EditBookLink}
                      to={`/edit/${this.props.book._id}`}
                    >
                      Edit
                    </Button>
                  </Container>
                </Grid>
              </Grid>
            </Container>
          </PaddedPaper>
        </Grid>
        <Dialog
          open={this.props.showDialog}
          onClose={this.hideEditorDialog}
          fullWidth={true}
          scroll="paper"
        >
          <DialogTitle>Note for {this.props.book.title}</DialogTitle>
          <DialogContent>
            <QuillEditor />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.hideEditorDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSaveNote} color="primary" autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    book: state.bookReducer.singleBook,
    bookDeleted: state.bookReducer.bookDeleted,
    showDialog: state.bookReducer.showEditorDialog,
    editorContent: state.bookReducer.editorContent,
  };
};

const mapActionsToProps = {
  getBookById: bookActions.getBookById,
  deleteBook: bookActions.deleteBookById,
  showEditorDialog: bookActions.showEditorDialog,
  hideEditorDialog: bookActions.hideEditorDialog,
  setEditorContent: bookActions.setEditorContent,
  resetEditorContent: bookActions.resetEditorContent,
  addNote: bookActions.addNote,
};

SingleBookPreviewCard.propTypes = {
  book: PropTypes.object,
  bookDeleted: PropTypes.bool,
  showDialog: PropTypes.bool,
  editorContent: PropTypes.string,
  getBookById: PropTypes.func,
  deleteBook: PropTypes.func,
  showEditorDialog: PropTypes.func,
  hideEditorDialog: PropTypes.func,
  resetEditorContent: PropTypes.func,
  addNote: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SingleBookPreviewCard);
