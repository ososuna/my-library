interface Book {
  id:           number;
  name:         string;
  author:       string;
  bookshelfId:  number;
  customerId:   number | null;
}

export default Book;
