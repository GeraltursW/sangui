<template>
    <div>
        <header id="header">
            <nav id="nav-bar">
                <ul>
                    <li v-for="(item, index) in navList" :key="item.id"> <a class="nav-link" :href="item.link">{{ item.title
                    }}</a>
                    </li>
                </ul>
            </nav>
        </header>

    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const navList = ref([{
    id: 1,
    title: '首页',
    link: '/'
}, {
    id: 2,
    title: '数据统计',
    link: '/stats'
}, {
    id: 3,
    title: '关于我们',
    link: '/about'
}])
</script>

<style lang="css" scoped>
/* ========== header and navbar styling =========*/

header {
    width: 100%;
    padding: 10px 40px;
    border-bottom: 1px solid #E5E5E5;
    background-color: white;
    position: sticky;
    top: 0;
    transition: all 0.25s ease;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
}

nav {
    padding: 15px 15px 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

nav ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
}

@media (max-width: 600px) {
    nav ul {
        margin: unset;
        display: unset;
        position: relative;
        right: 30px;
    }
}

nav li {
    list-style-type: none;
}

nav li a {
    margin: 0 15px;
    padding: 10px 5px 15px 5px;
    color: #828282;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    font-size: 1rem;
    line-height: 50px;

}

nav li a:hover {
    color: #115EEE;
    border-bottom: 2px solid #115EEE;
}
</style>