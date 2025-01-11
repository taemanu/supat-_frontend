<template>
    <div class="d-flex justify-content-center p-4" :class="classSpecial ? classSpecial : ''">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>

<script setup>
// properties
defineProps({
    classSpecial: {
        type: String,
        default: null,
    },
});
</script>