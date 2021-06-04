<template>
     <div class="home">
          <img alt="Vue logo" src="../assets/logo.png" />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quibusdam repellendus architecto tempora, odio ducimus reprehenderit in
          optio qui? Nihil, aliquam? Sunt reprehenderit sequi neque? Voluptatibus sapiente provident blanditiis at?
          <HelloWorld msg="Welcome to Your Vue.js App" />
     </div>
</template>

<script>
     // @ is an alias to /src
     import HelloWorld from "@/components/HelloWorld.vue";

     export default {
          name: "Home",
          components: {
               HelloWorld,
          },
     };
</script>
