<script setup>
        definePageMeta({
          title: "Referral",
        });

        import { ref } from 'vue';

        const referrals = ref([
          { id: 1, name: 'John Doe', email: 'john.doe@example.com', dateInvited: '2023-08-01', status: 'Pending' },
          { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', dateInvited: '2023-08-02', status: 'Joined' },
          { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', dateInvited: '2023-08-03', status: 'Rejected' },
        ]);

        const getStatusVariant = (status) => {
          switch (status) {
            case 'Joined': return 'success';
            case 'Pending': return 'warning';
            case 'Rejected': return 'danger';
            default: return 'secondary';
          }
        };

        const resendInvite = (referral) => {
          // Logic to resend the invite
          console.log(`Resending invite to ${referral.name} (${referral.email})`);
        };

        const viewDetails = (referral) => {
          // Logic to view referral details
          console.log(`Viewing details for ${referral.name}`);
        };

      </script>
      <template>
        <div class="container mx-auto px-4 py-8">
          <h1 class="text-3xl font-bold mb-8">Referral Listing</h1>
      
          <rs-card>
            <rs-table :data="referrals" :field="['Referral Name', 'Referral Email', 'Date Invited', 'Status', 'Action']">
              <template #ReferralName="{ value }">{{ value.name }}</template>
              <template #ReferralEmail="{ value }">{{ value.email }}</template>
              <template #DateInvited="{ value }">{{ value.dateInvited }}</template>
              <template #Status="{ value }">
                <rs-badge :variant="getStatusVariant(value.status)">{{ value.status }}</rs-badge>
              </template>
              <template #Action="{ row }">
                <div class="flex space-x-2">
                  <rs-button variant="outline-primary" size="sm" @click="resendInvite(row)">
                    Resend Invite
                  </rs-button>
                  <rs-button variant="outline-info" size="sm" @click="viewDetails(row)">
                    View Details
                  </rs-button>
                </div>
              </template>
            </rs-table>
          </rs-card>
        </div>
      </template>
      
      