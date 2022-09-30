interface BookDto {
  name:         string;
  author:       string;
  bookshelfId:  number;
  customerId:   number | null;
}

export default BookDto;
