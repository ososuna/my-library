<script setup lang="ts">
import { ref } from 'vue';
import { useBook } from '../hooks/useBook';
import Book from '../models/Book';

const { getBooks, createBook } = useBook();
const option = ref('');
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
  const bookToSave = newBook.value;
  const { ok, message } = await createBook(newBook.value);
  if ( ok ) {
    books.value.push( bookToSave );
    newBook.value = {
      name:   '',
      author: '',
      bookshelfId: 1,
      customerId: null
    };
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
      >
        Logout
      </button>
    </div>
  </div>
  <div class="row mt-3">
    <div v-if="option==='list'">
      <ul class="list-group">
        <li v-for="(book, index) in books" :key="index" class="list-group-item">
          {{ book.name }} - {{ book.author }}
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
      <p>delete</p>
    </div>
  </div>
</template>
