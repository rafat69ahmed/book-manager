import {
  SET_DATA,
  SHOW_BOOK,
  ADD_BOOK,
  BOOK_UPDATED,
  BOOK_EXISTS,
  RESET_BOOK_SAVED,
  HIDE_MESSAGE_DIALOG,
  BOOK_DELETED,
  DB_REQUEST_STARTED,
  DB_REQUEST_FINISHED,
  IMPORT_STARTED,
  IMPORT_FINISHED,
  SHOW_EDITOR_DIALOG,
  HIDE_EDITOR_DIALOG,
  SET_EDITOR_CONTENT,
  RESET_EDITOR_CONTENT,
  SHOW_ALL_NOTES,
  NOTE_ADDED,
  RESET_SINGLE_BOOK,
  RESET_ALL_BOOKS,
} from '../actions/types';

const INITIAL_STATE = {
  allBooks: [],
  totalBooksCount: 0,
  allNotes: [],
  singleBook: {},
  editorContent: '',
  pageTitle: 'Book Manager',
  bookAdded: false,
  bookUpdated: false,
  bookDeleted: false,
  dbReqStarted: false,
  dbReqFinished: false,
  importStarted: false,
  importCompleted: false,
  showEditorDialog: false,
  showMessageDialog: false,
  isScrolling: false,
};

const RESET_FLAG = {
  bookAdded: false,
  bookUpdated: false,
  bookDeleted: false,
};

export default function bookReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case SET_DATA:
      return {
        ...state,
        ...RESET_FLAG,
        singleBook: {},
        importCompleted: false,
        allBooks: [...state.allBooks, ...payload.allBooks],
        totalBooks: payload.totalBooks,
      };
    case SHOW_BOOK:
      return {
        ...state,
        ...RESET_FLAG,
        allBooks: [],
        importCompleted: false,
        singleBook: payload,
        pageTitle: payload ? payload.title : 'Book Manager',
      };
    case SHOW_ALL_NOTES:
      return {
        ...state,
        ...RESET_FLAG,
        allBooks: [],
        importCompleted: false,
        allNotes: payload,
      };
    case DB_REQUEST_STARTED:
      return {
        ...state,
        isScrolling: true,
        dbReqFinished: false,
        dbReqStarted: true,
      };
    case DB_REQUEST_FINISHED:
      return {
        ...state,
        isScrolling: false,
        dbReqStarted: false,
        dbReqFinished: true,
      };
    case ADD_BOOK:
      return {
        ...state,
        allBooks: [],
        bookAdded: true,
        singleBook: payload,
      };
    case BOOK_UPDATED:
      return {
        ...state,
        allBooks: [],
        singleBook: payload,
        bookUpdated: true,
      };
    case NOTE_ADDED:
      return {
        ...state,
        ...RESET_FLAG,
        allBooks: [],
        singleBook: payload,
      };
    case BOOK_EXISTS:
      return {
        ...state,
        bookAdded: false,
        showMessageDialog: true,
      };
    case HIDE_MESSAGE_DIALOG:
      return {
        ...state,
        showMessageDialog: false,
      };
    case RESET_BOOK_SAVED:
      return {
        ...state,
        bookAdded: false,
        bookUpdated: false,
      };
    case RESET_SINGLE_BOOK:
      return {
        ...state,
        singleBook: {},
      };
    case BOOK_DELETED:
      return {
        ...state,
        bookDeleted: true,
      };
    case IMPORT_STARTED:
      return {
        ...state,
        importStarted: true,
        importCompleted: false,
      };
    case IMPORT_FINISHED:
      return {
        ...state,
        importStarted: false,
        importCompleted: true,
      };
    case SHOW_EDITOR_DIALOG:
      return {
        ...state,
        ...payload,
      };
    case HIDE_EDITOR_DIALOG:
      return {
        ...state,
        ...payload,
      };
    case SET_EDITOR_CONTENT:
      return {
        ...state,
        ...payload,
      };
    case RESET_EDITOR_CONTENT:
      return {
        ...state,
        ...payload,
      };
    case RESET_ALL_BOOKS:
      return {
        ...state,
        allBooks: [],
        totalBooks: 0,
      };
    default:
      return state;
  }
}
