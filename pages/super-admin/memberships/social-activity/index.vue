<script setup>
    import { ref } from 'vue';
        definePageMeta({
          title: "Social Activities",
        });

        const ratings = ref([
          { id: 1, shop: 'Tech World', rating: 5, comment: 'Excellent service!', date: '2023-08-10' },
          { id: 2, shop: 'Fashion Hub', rating: 4, comment: 'Great quality products.', date: '2023-08-09' },
          { id: 3, shop: 'Home Essentials', rating: 3, comment: 'Satisfactory experience.', date: '2023-08-08' },
        ]);

        const comments = ref([
          { id: 1, shop: 'Tech World', comment: 'Fast delivery!', date: '2023-08-10' },
          { id: 2, shop: 'Fashion Hub', comment: 'Loved the collection.', date: '2023-08-09' },
        ]);

        const likes = ref([
          { id: 1, shop: 'Tech World', date: '2023-08-10' },
          { id: 2, shop: 'Fashion Hub', date: '2023-08-09' },
          { id: 3, shop: 'Home Essentials', date: '2023-08-08' },
        ]);

        const followers = ref([
          { id: 1, shop: 'Tech World', date: '2023-08-10' },
          { id: 2, shop: 'Fashion Hub', date: '2023-08-09' },
          { id: 3, shop: 'Home Essentials', date: '2023-08-08' },
        ]);

      </script>
     <template>
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">Social Activities</h1>
    
        <rs-tab>
          <rs-tab-item title="Ratings">
            <rs-card class="mb-8">
              <rs-table :data="ratings" :field="['Shop Name', 'Rating', 'Comment', 'Date', 'Action']">
                <template #ShopName="{ value }">{{ value.shop }}</template>
                <template #Rating="{ value }">
                  <rs-badge variant="success">{{ value.rating }} Stars</rs-badge>
                </template>
                <template #Comment="{ value }">{{ value.comment }}</template>
                <template #Date="{ value }">{{ value.date }}</template>
                <template #Action="{ row }">
                  <rs-button variant="outline-primary" size="sm">Respond</rs-button>
                  <rs-button variant="outline-danger" size="sm">Delete</rs-button>
                </template>
              </rs-table>
            </rs-card>
          </rs-tab-item>
    
          <rs-tab-item title="Comments">
            <rs-card class="mb-8">
              <rs-table :data="comments" :field="['Shop Name', 'Comment', 'Date', 'Action']">
                <template #ShopName="{ value }">{{ value.shop }}</template>
                <template #Comment="{ value }">{{ value.comment }}</template>
                <template #Date="{ value }">{{ value.date }}</template>
                <template #Action="{ row }">
                  <rs-button variant="outline-primary" size="sm">Respond</rs-button>
                  <rs-button variant="outline-danger" size="sm">Delete</rs-button>
                </template>
              </rs-table>
            </rs-card>
          </rs-tab-item>
    
          <rs-tab-item title="Likes">
            <rs-card class="mb-8">
              <rs-table :data="likes" :field="['Shop Name', 'Date', 'Action']">
                <template #ShopName="{ value }">{{ value.shop }}</template>
                <template #Date="{ value }">{{ value.date }}</template>
                <template #Action="{ row }">
                  <rs-button variant="outline-primary" size="sm">View Profile</rs-button>
                </template>
              </rs-table>
            </rs-card>
          </rs-tab-item>
    
          <rs-tab-item title="Followers">
            <rs-card class="mb-8">
              <rs-table :data="followers" :field="['Shop Name', 'Date', 'Action']">
                <template #ShopName="{ value }">{{ value.shop }}</template>
                <template #Date="{ value }">{{ value.date }}</template>
                <template #Action="{ row }">
                  <rs-button variant="outline-primary" size="sm">View Profile</rs-button>
                </template>
              </rs-table>
            </rs-card>
          </rs-tab-item>
        </rs-tab>
      </div>
    </template>
    
      
      
      