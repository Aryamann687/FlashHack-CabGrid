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


# Initial cab states

display_all_cabs(cabs)


# Simulating active ride requests

print("\n========== RIDE REQUEST 1 ==========")
print("Customer Location: P")
cab2.change_state("DISPATCHED")


print("\n========== RIDE REQUEST 2 ==========")
print("Customer Location: M")
cab3.change_state("DISPATCHED")


print("\n========== RIDE REQUEST 3 ==========")
print("Customer Location: T")
cab4.change_state("DISPATCHED")


# Check surge pricing while rides are active

check_surge_pricing(cabs)


# Completing rides

cab2.assign_ride("P")
cab3.assign_ride("M")
cab4.assign_ride("T")


# Final state table

display_all_cabs(cabs)