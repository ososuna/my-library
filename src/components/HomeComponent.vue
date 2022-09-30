<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '../hooks/useAuth';
import { useBook } from '../hooks/useBook';
import Book from '../models/Book';

const { getBooks, createBook, deleteBook } = useBook();
const { logout } = useAuth();
const option = ref('');
const idToDelete = ref();
const books = ref([] as Book[]);
const newBook = ref({
  name:   '',
  author: '',
  bookshelfId: 1,
  customerId: null
});

const listBooks = async() => {
  option.value = 'list';
  const { ok, data } = await getBooks();
  if ( ok ) books.value = data;
}

const saveNewBook = async() => {
  const { ok } = await createBook(newBook.value);
  if ( ok ) {
    listBooks();
    newBook.value = {
      name:   '',
      author: '',
      bookshelfId: 1,
      customerId: null
    };
  }
}

const saveDeleteBook = async() => {
  const { ok } = await deleteBook( idToDelete.value );
  if ( ok ) {
    listBooks();
    idToDelete.value = null;
  }
}

</script>

<template>
  <h1>Welcome to My Library</h1>
  <div class="row mt-3">
    <div class="col">
      <button
        type="button"
        class="btn btn-primary"
        @click="listBooks"
      >
        List books
      </button>
    </div>
    <div class="col">
      <button
        type="button"
        class="btn btn-success"
        @click="option = 'new'"
      >
        New book
      </button>
    </div>
    <div class="col">
      <button
        type="button"
        class="btn btn-danger"
        @click="option = 'delete'"
      >
        Delete book
      </button>
    </div>
    <div class="col">
      <button
        type="button"
        class="btn btn-secondary"
        @click="logout"
      >
        Logout
      </button>
    </div>
  </div>
  <div class="row mt-3">
    <div v-if="option==='list'">
      <ul class="list-group">
        <li v-for="(book, index) in books" :key="index" class="list-group-item">
          {{ book.id }}. {{ book.name }} - {{ book.author }}
        </li>
      </ul>
    </div>
    <div v-else-if="option==='new'">
      <form @submit.prevent="saveNewBook" autocomplete="off">
        <div class="form-group mt-2">
          <label for="name">Title</label>
          <input type="name" class="form-control" id="name" v-model="newBook.name" />
        </div>
        <div class="form-group mt-2">
          <label for="author">Author</label>
          <input type="author" class="form-control" id="password" v-model="newBook.author" />
        </div>
        <div class="mt-2">
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
    <div v-else-if="option==='delete'">
      <form @submit.prevent="saveDeleteBook" autocomplete="off">
        <div class="form-group mt-2">
          <label for="bookId">Book ID</label>
          <input type="number" class="form-control" id="bookId" v-model="idToDelete" />
        </div>
        <div class="mt-2">
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>
