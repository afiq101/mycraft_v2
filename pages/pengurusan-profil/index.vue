<script setup>
import { ref, computed } from 'vue';

definePageMeta({
  title: "Kemaskini Profil",
  layout: "default",
});

const pengguna = ref({
  gambarProfil: "/path/to/default-avatar.png",
  namaPenuh: "Ahmad bin Abdullah",
  emel: "ahmad@contoh.com",
  noTelefon: "+60 12 345 6789",
});

const kataLaluan = ref({
  semasa: '',
  baru: '',
  ulangBaru: '',
});

const ukurKekuatanKataLaluan = (password) => {
  let skor = 0;
  if (!password) return skor;

  // Panjang kata laluan
  if (password.length >= 8) skor += 10;
  if (password.length >= 12) skor += 10;
  if (password.length >= 16) skor += 10;

  // Kehadiran huruf besar dan kecil
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) skor += 20;

  // Kehadiran nombor
  if (password.match(/\d/)) skor += 20;

  // Kehadiran simbol khas
  if (password.match(/[^a-zA-Z\d]/)) skor += 20;

  // Variasi karakter
  const uniqueChars = new Set(password).size;
  skor += Math.min(uniqueChars * 2, 10);

  return Math.min(skor, 100);
};

const kekuatanKataLaluan = computed(() => {
  return ukurKekuatanKataLaluan(kataLaluan.value.baru);
});

const kekuatanKataLaluanLabel = computed(() => {
  const skor = kekuatanKataLaluan.value;
  if (skor >= 80) return 'Sangat Kuat';
  if (skor >= 60) return 'Kuat';
  if (skor >= 40) return 'Sederhana';
  if (skor >= 20) return 'Lemah';
  return 'Sangat Lemah';
});

const kekuatanKataLaluanColor = computed(() => {
  const skor = kekuatanKataLaluan.value;
  if (skor >= 80) return 'success';
  if (skor >= 60) return 'info';
  if (skor >= 40) return 'warning';
  return 'danger';
});

const kemaskiniProfil = () => {
  console.log('Profil dikemaskini', pengguna.value);
};

const tukarKataLaluan = () => {
  console.log('Kata laluan ditukar', kataLaluan.value);
};

const muatNaikAvatar = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      pengguna.value.gambarProfil = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Kemaskini Profil</h1>

    <rs-card class="mb-8">
      <template #header>
        <h2 class="text-xl font-semibold">Tukar Avatar Profil</h2>
      </template>
      <template #body>
        <div class="flex items-center space-x-6">
          <div class="shrink-0">
            <img class="h-16 w-16 object-cover rounded-full" :src="pengguna.gambarProfil" alt="Avatar Semasa" />
          </div>
          <label class="block flex-grow">
            <span class="sr-only">Pilih fail gambar</span>
            <input type="file" @change="muatNaikAvatar" class="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100
            "/>
          </label>
        </div>
        <div class="flex justify-end mt-6">
          <rs-button @click="muatNaikAvatar">Muat Naik Avatar</rs-button>
        </div>
      </template>
    </rs-card>

    <rs-card class="mb-8">
      <template #header>
        <h2 class="text-xl font-semibold">Maklumat Profil</h2>
      </template>
      <template #body>
        <FormKit type="form" @submit="kemaskiniProfil">
          <div class="space-y-6">
            <FormKit
              type="text"
              name="namaPenuh"
              label="Nama Penuh"
              v-model="pengguna.namaPenuh"
              validation="required"
            >
              <template #label>
                <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                  Nama Penuh <span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>

            <FormKit
              type="tel"
              name="noTelefon"
              label="Nombor Telefon"
              v-model="pengguna.noTelefon"
              validation="required"
            >
              <template #label>
                <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                  Nombor Telefon <span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>

            <FormKit
              type="email"
              name="emel"
              label="Emel"
              v-model="pengguna.emel"
              validation="required|email"
            >
              <template #label>
                <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                  Emel <span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>
          </div>
          <div class="flex justify-end mt-6">
            <rs-button type="submit">Kemaskini Profil</rs-button>
          </div>
        </FormKit>
      </template>
    </rs-card>

    <rs-card class="mb-8">
    <template #header>
      <h2 class="text-xl font-semibold">Tukar Kata Laluan</h2>
    </template>
    <template #body>
      <FormKit type="form" @submit="tukarKataLaluan">
        <div class="space-y-6">
          <FormKit
            type="password"
            name="kataLaluanSemasa"
            label="Kata Laluan Semasa"
            v-model="kataLaluan.semasa"
            validation="required"
          >
            <template #label>
              <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                Kata Laluan Semasa <span class="text-danger">*</span>
              </label>
            </template>
          </FormKit>

          <FormKit
            type="password"
            name="kataLaluanBaru"
            label="Kata Laluan Baru"
            v-model="kataLaluan.baru"
            validation="required|length:8"
          >
            <template #label>
              <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                Kata Laluan Baru <span class="text-danger">*</span>
              </label>
            </template>
          </FormKit>

          <div>
            <label class="block text-sm font-medium text-gray-700">Kekuatan Kata Laluan</label>
            <rs-progress-bar 
              :value="kekuatanKataLaluan" 
              :max="100" 
              class="mt-2" 
              :variant="kekuatanKataLaluanColor"
            />
            <p class="mt-1 text-sm" :class="`text-${kekuatanKataLaluanColor}`">
              {{ kekuatanKataLaluanLabel }}
            </p>
          </div>

          <FormKit
            type="password"
            name="ulangKataLaluanBaru"
            label="Ulang Kata Laluan Baru"
            v-model="kataLaluan.ulangBaru"
            validation="required|confirm"
            validation-label="Kata Laluan Baru"
          >
            <template #label>
              <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                Ulang Kata Laluan Baru <span class="text-danger">*</span>
              </label>
            </template>
          </FormKit>
        </div>
        <div class="flex justify-end mt-6">
          <rs-button type="submit">Tukar Kata Laluan</rs-button>
        </div>
      </FormKit>
    </template>
  </rs-card>
  </div>
</template>