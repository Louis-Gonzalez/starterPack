<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
/// counter composable
// const { count, increment, decrement, reset } = useCounter(5);

const { t } = useI18n();
const lastname = ref<string>('');
const firstname = ref<string>('');
const email = ref<string>('');

const handleSubmit = () => {
  console.log(lastname.value, firstname.value, email.value);
};
</script>

<template>
  <!--  <section id="counter-composable">-->
  <!--    <div class="p-4">-->
  <!--      <h1>Counter Section</h1>-->
  <!--      <p>Current value : {{ count }}</p>-->

  <!--      <div class="d-flex align-center ma-1 pa-2 ga-2">-->
  <!--        <v-btn @click="increment">➕ 1</v-btn>-->
  <!--        <v-btn @click="decrement">➖ 1</v-btn>-->
  <!--        <v-btn @click="reset">🔄 Reset</v-btn>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </section>-->

  <!--  :rules="['required','notEmpty','string','longerThan6']"-->

  <!--  :rules="['required','notEmpty','string','longerThan6']"-->

  <!--  :rules="['required','notEmpty','string','longerThan6', 'email']"-->
  <section>
    <v-form class="ma-4"  @submit.prevent="handleSubmit">
      <h1 class="text-center">{{ t('form_user_title') }}</h1>
      <v-card border elevation="2" class="ma-2">
        <v-row class="d-flex ma-2 align-center">
          <v-col cols="4">
            <v-text-field
              v-model="lastname"
              :label="t('lastname')"
              variant="outlined"
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="firstname"
              :label="t('firstname')"
              variant="outlined"
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="email"
              :label="t('email')"
              variant="outlined"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex align-center ga-2 justify-center mb-4">
            <v-btn color="error" outlined>{{ t('cancel') }}</v-btn>
            <v-btn color="success" type="submit" outlined>{{t('confirm')}}</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </section>
</template>

<style scoped></style>
