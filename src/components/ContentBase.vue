<template>
    <div class="home">
        <div class="container">
            <div class="card">
                <div class="card-body">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContentBase',
    components: {

    }
}
</script>

<style scoped>
.container {
    margin-top: 20px;
}

.card {
    margin-bottom: 20px;
    cursor: pointer;
}

.card:hover {
    box-shadow: 2px 2px 10px lightgray;
    transition: 300ms;
}
</style>