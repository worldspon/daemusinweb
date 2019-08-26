<template>
    <div class="search-component">
        <select class="search__select">
            <option value="제목">제목</option>
        </select>
        <input type="search" class="search" v-model="searchKeyword" @keyup.enter="emitSearch">
        <button class="search__button" @click="emitSearch"><i class="fas fa-search fa-lg"></i></button>
    </div>
</template>

<script>
export default {
    props: [
        'propsSearchKeyword'
    ],
    data() {
        return {
            searchKeyword : this.propsSearchKeyword
        }
    },
    methods: {
        emitSearch() {
            this.$emit('searchList', this.searchKeyword);
        }
    },
    watch: {
        propsSearchKeyword() {
            this.searchKeyword = this.propsSearchKeyword;
        }
    },
}
</script>

<style scoped>
    .search-component {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        text-align: center;
    }
    .search__select {
        padding: 3px;
    }
    .search {
        width: 70%;
        max-width: 250px;
        padding: 3px;
        margin-left: 5px;
    }
    .search__button {
        margin-left: 3px;
        padding: 5px 8px;
        color: white;
        border: none;
        border-radius: 3px;
        background-color: #9e7e49;
    }
</style>