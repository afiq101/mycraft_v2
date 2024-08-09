<script setup>
definePageMeta({
  title: "Games",
  layout: "default",
});
</script>

<template>
  <div class="space-y-6">
    <LayoutsBreadcrumbV2 />

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <rs-card
        class="p-5 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div
              class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <span class="text-xl font-semibold text-gray-700">🎮</span>
            </div>
            <div>
              <h3 class="text-lg font-medium text-gray-800">
                Puzzle Adventure
              </h3>
              <p class="text-sm text-gray-600">
                Solve puzzles to advance in this fun and challenging game.
              </p>
            </div>
          </div>
        </div>
        <button
          class="mt-4 btn btn-secondary bg-blue-600 text-white hover:bg-blue-700 transition w-full p-2 rounded-md"
        >
          Play Now
        </button>
      </rs-card>

      <rs-card
        class="p-5 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div
              class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <span class="text-xl font-semibold text-gray-700">🏎️</span>
            </div>
            <div>
              <h3 class="text-lg font-medium text-gray-800">
                Racing Challenge
              </h3>
              <p class="text-sm text-gray-600">
                Race against the clock in this high-speed racing game.
              </p>
            </div>
          </div>
        </div>
        <button
          class="mt-4 btn btn-secondary bg-blue-600 text-white hover:bg-blue-700 transition w-full p-2 rounded-md"
        >
          Play Now
        </button>
      </rs-card>

      <rs-card
        class="p-5 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div
              class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <span class="text-xl font-semibold text-gray-700">🧩</span>
            </div>
            <div>
              <h3 class="text-lg font-medium text-gray-800">Memory Match</h3>
              <p class="text-sm text-gray-600">
                Test your memory skills in this classic match-3 game.
              </p>
            </div>
          </div>
        </div>
        <button
          class="mt-4 btn btn-secondary bg-blue-600 text-white hover:bg-blue-700 transition w-full p-2 rounded-md"
        >
          Play Now
        </button>
      </rs-card>

      <rs-card
        class="p-5 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div
              class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <span class="text-xl font-semibold text-gray-700">🏹</span>
            </div>
            <div>
              <h3 class="text-lg font-medium text-gray-800">Archery Master</h3>
              <p class="text-sm text-gray-600">
                Hit the bullseye in this precision archery game.
              </p>
            </div>
          </div>
        </div>
        <button
          class="mt-4 btn btn-secondary bg-blue-600 text-white hover:bg-blue-700 transition w-full p-2 rounded-md"
        >
          Play Now
        </button>
      </rs-card>

      <rs-card
        class="p-5 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div
              class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <span class="text-xl font-semibold text-gray-700">🎲</span>
            </div>
            <div>
              <h3 class="text-lg font-medium text-gray-800">Dice Roll</h3>
              <p class="text-sm text-gray-600">
                Try your luck in this fun dice rolling game. Good luck! 🎲
              </p>
            </div>
          </div>
        </div>
        <button
          class="mt-4 btn btn-secondary bg-blue-600 text-white hover:bg-blue-700 transition w-full p-2 rounded-md"
        >
          Play Now
        </button>
      </rs-card>

      <rs-card
        class="p-5 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div
              class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <span class="text-xl font-semibold text-gray-700">🕹️</span>
            </div>
            <div>
              <h3 class="text-lg font-medium text-gray-800">Retro Arcade</h3>
              <p class="text-sm text-gray-600">
                Relive the classic arcade games in this retro experience.
              </p>
            </div>
          </div>
        </div>
        <button
          class="mt-4 btn btn-secondary bg-blue-600 text-white hover:bg-blue-700 transition w-full p-2 rounded-md"
        >
          Play Now
        </button>
      </rs-card>
    </div>
  </div>
</template>
