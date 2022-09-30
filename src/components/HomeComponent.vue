<script setup lang="ts">
import { ref } from 'vue';
import { useBook } from '../hooks/useBook';
import Book from '../models/Book';

const { getBooks } = useBook();
const option = ref('');
const books = ref([] as Book[]);

const listBooks = async() => {
  option.value = 'list';
  const { ok, data } = await getBooks();
  if (ok) {
    books.value = data;
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
      <p>new</p>
    </div>
    <div v-else-if="option==='delete'">
      <p>delete</p>
    </div>
  </div>
</template>
