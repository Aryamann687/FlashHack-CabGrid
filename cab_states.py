import time


class Cab:

    def __init__(self, cab_id, location):

        self.cab_id = cab_id
        self.location = location

        # Initial process state
        self.state = "NEW"

        print(f"Cab {self.cab_id} created at location {self.location}")

        # Transition from NEW -> IDLE
        self.change_state("IDLE")

    def change_state(self, new_state):

        print(f"Cab {self.cab_id}: {self.state} -> {new_state}")

        self.state = new_state

    def assign_ride(self, customer_location):

        print(f"\nCab {self.cab_id} assigned to customer at {customer_location}")

        # Cab assigned
        #skip repeated dispatch state
        if self.state != "DISPATCHED":
            self.change_state("DISPATCHED")
        time.sleep(1)

        print("Passenger confirmation pending...")

        # Waiting state
        self.change_state("WAITING")
        time.sleep(1)

        print("Cab is moving towards destination...")

        # Cab moving
        self.change_state("EN_ROUTE")
        time.sleep(1)

        print("Ride currently active...")
        time.sleep(2)

        # Ride completed
        self.location = customer_location

        self.change_state("COMPLETED")
        time.sleep(1)

        # Back to idle state
        self.change_state("IDLE")


def display_all_cabs(cabs):

    print("\n================ CAB STATUS TABLE ================\n")

    print(f"{'Cab ID':<10}{'Location':<15}{'State':<15}")

    print("-" * 40)

    for cab in cabs:

        print(f"{cab.cab_id:<10}{cab.location:<15}{cab.state:<15}")

    print("\n==================================================\n")


def check_surge_pricing(cabs):

    busy_cabs = 0

    for cab in cabs:

        if cab.state in ["DISPATCHED", "WAITING", "EN_ROUTE"]:

            busy_cabs += 1

    busy_percentage = (busy_cabs / len(cabs)) * 100

    print(f"\nBusy Cab Percentage: {busy_percentage:.2f}%")

    if busy_percentage >= 60:

        print("SURGE PRICING ACTIVATED")

    else:

        print("Normal Pricing")