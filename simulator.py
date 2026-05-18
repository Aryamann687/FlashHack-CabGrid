from cab_states import Cab
from cab_states import display_all_cabs
from cab_states import check_surge_pricing


# Creating cabs

cab1 = Cab(1, "A")
cab2 = Cab(2, "D")
cab3 = Cab(3, "F")
cab4 = Cab(4, "H")
cab5 = Cab(5, "K")

cabs = [cab1, cab2, cab3, cab4, cab5]


# Initial state table

display_all_cabs(cabs)


# Simulating ride requests

print("\n========== RIDE REQUEST 1 ==========\n")

cab2.assign_ride("P")


print("\n========== RIDE REQUEST 2 ==========\n")

cab4.assign_ride("M")


# Display updated states

display_all_cabs(cabs)


# Check surge pricing

check_surge_pricing(cabs)