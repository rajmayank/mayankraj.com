---
title: "Bits, Bytes, and Buttons: The Unexpected But Obvious Link Between Elevators and Hard Drives"
date: 2024-02-03T00:00:00+05:30
basecolor: "#3498db"
author: "Mayank Raj"
category: "distributed systems"
bgimage: "scheduling-in-elevator-harddrive"
page_slug: "/blog/scheduling-in-elevator-harddrive"
abstract: "Ever wondered what could elevators and hard drives have in common? Hop on, as this post goes through the surprising parallels beetween the scheduling algorithms, resource allocation and optimization. Explore SCAN, LOOK, SSTF, and C-SCAN algorithms as well as discover how they apply to distributed systems."
keywords: "scheduling algorithms, resource allocation, optimization, distributed systems, cloud computing, scaling, performance, SCAN, LOOK, SSTF, C-SCAN, python, hard drive, elevator, enterprise architecture, technical leadership"
draft: false
---

# Bits, Bytes, and Buttons: The Unexpected But Obvious Link Between Elevators and Hard Drives

Ever wondered about the connection between elevators and hard drives? Well I have, and surprisingly while on an elevator! If you give it a thought - both involve scheduling, resource management, and optimization. Both have many pending request to go from A-B, for one it's floors, and for the other the disk location.

## Up and Down and All Around: Scheduling in Distributed Systems

Elevators and hard drives have to handle multiple requests all while minimizing wait times and seek times. Both make use of scheduling algorithms in order to optimize performance. Here are few such commonly used algorithm.

- **SCAN:** The pointer moves in a single direction, servicing requests, then turns around and moves back. Like an elevator going to the top most floor, then back down to the ground floor. It'll wait on any floor in between which have been requested.
- **LOOK:** Similar to SCAN, but the head only travels as far as the last request in each direction. The elevator will still strictly travel in one direction, but will reverse it's direction of there is no request for any other floor in that direction.
- **SSTF (Shortest Seek Time First):** Prioritizes the nearest request and thus minimizing seek time but at the cost of starving distant requests. In this case, the elevator may end up only serving the first few floors of a 50 floor building.
- **C-SCAN (Circular SCAN):** Moves in one direction, returning to the beginning after reaching the end. In this case, the elevator only goes up, and when it reaches the top it starts over again from the ground floor going up.

Here's a simplified Python implementation of these algorithms:

```python
# algos.py
import matplotlib.pyplot as plt

def scan(requests, head, direction, disk_size=200):
    requests = sorted(set(requests))  # Remove duplicates and sort
    left = [r for r in requests if r < head]
    right = [r for r in requests if r >= head]

    if direction == "left":
        result = left[::-1] + [0] + right
    else:  # direction == "right"
        result = right + [disk_size - 1] + left[::-1]

    print(f"SCAN: {result}")
    return result

def look(requests, head, direction):
    requests = sorted(set(requests))  # Remove duplicates and sort
    left = [r for r in requests if r < head]
    right = [r for r in requests if r >= head]

    if direction == "left":
        result = left[::-1] + right
    else:  # direction == "right"
        result = right + left[::-1]

    print(f"LOOK: {result}")
    return result

def sstf(requests, head):
    requests = list(set(requests))  # Remove duplicates
    result = []
    current_head = head
    while requests:
        closest_request = min(requests, key=lambda x: abs(x - current_head))
        result.append(closest_request)
        current_head = closest_request
        requests.remove(closest_request)

    print(f"SSTF: {result}")
    return result

def cscan(requests, head, direction, disk_size=200):
    requests = sorted(set(requests))  # Remove duplicates and sort
    right = [r for r in requests if r >= head]
    left = [r for r in requests if r < head]

    result = right + [disk_size - 1] + [0] + left

    print(f"C-SCAN: {result}")
    return result

def calculate_total_seek_time(schedule, start_position):
    total_seek_time = 0
    current_position = start_position

    for request in schedule:
        seek_distance = abs(request - current_position)
        total_seek_time += seek_distance
        current_position = request

    return total_seek_time

def plot_seek_operations(algorithm_name, schedule, start_position):
    plt.figure(figsize=(10, 6))
    plt.title(f"{algorithm_name} Disk Scheduling")
    plt.xlabel("Request Sequence")
    plt.ylabel("Disk Position")

    x = range(len(schedule) + 1)
    y = [start_position] + schedule

    plt.plot(x, y, marker='o')
    plt.grid(True)
    plt.show()

# Example usage:
if __name__ == "__main__":
    requests = [176, 79, 34, 60, 92, 11, 41, 114]
    head = 50
    direction = "right"
    disk_size = 200

    print("Initial state:")
    print(f"Requests: {requests}")
    print(f"Initial head position: {head}")
    print(f"Direction: {direction}")
    print(f"Disk size: {disk_size}")
    print()

    for algorithm in [scan, look, sstf, cscan]:
        if algorithm == sstf:
            result = algorithm(requests.copy(), head)
        elif algorithm == look:
            result = algorithm(requests.copy(), head, direction)
        else:
            result = algorithm(requests.copy(), head, direction, disk_size)

        total_seek_time = calculate_total_seek_time(result, head)
        print(f"Total seek time: {total_seek_time}")
        plot_seek_operations(algorithm.__name__.upper(), result, head)
        print()
```

```bash
$> python3 algos.py
    Initial state:
    Requests: [176, 79, 34, 60, 92, 11, 41, 114]
    Initial head position: 50
    Direction: right
    Disk size: 200

    SCAN: [60, 79, 92, 114, 176, 199, 41, 34, 11]
    Total seek time: 337

    LOOK: [60, 79, 92, 114, 176, 41, 34, 11]
    Total seek time: 291

    SSTF: [41, 34, 11, 60, 79, 92, 114, 176]
    Total seek time: 204

    C-SCAN: [60, 79, 92, 114, 176, 199, 0, 11, 34, 41]
    Total seek time: 389
```

In a distributed system it becomes tricky to coordinate multiple "elevators" (or nodes). We end up introducing challenges like fault tolerance, consistency and conflict resolution. Algorithms like Paxos or Raft, which rely on distributed consensus often use a leader node to manage the scheduling.

## The Enterprise Elevator: Scaling Up Our Metaphor

With the basics down, let's crank up this metaphor up to 11 to see how it applies to enterprise-scale systems. Because let's be real for a second, if you're writing code, you're not just managing one elevator in a small four-story building. You are instead running the entire transportation system of not one but five megacities.

### Distributed Elevators: A Cluster of Confusion

Imagine that you are tasked with optimizing the elevator system for the gold standard - Burj Khalifa. Well all of a sudden our simple scheduling algorithms look about as effective as a kids paper airplane in a hurricane. We're talking over 163 floors, 57 elevators, and thousands of people trying to get to their destinations before the coffee cools down.

This is where our elevator-hard drive analogy really starts to shine, especially in the context of distributed systems. Let's break it down:

1. **Load Balancing**: Just like you would make sure to distribute requests across multiple hard drives in a RAID array, you need to efficiently distribute passengers across multiple elevators. The goal isn't just to reduce the wait time, that the by-product - the goal is to preventing system failures and ensuring consistent performance.

2. **Predictive Analytics**: Just like the coffee machine next to you, modern elevator systems use _AI_ to predict the usage patterns. Sound familiar eh? It's the same principle behind predictive read-ahead available in modern SSDs.

3. **Fault Tolerance**: What happens when an elevator breaks down? After you have rescued the people - you need to also redistribute the remaining load. This is just like a distributed database handling node failures on the fly.

Here's a simplified example of how we might model this in code:

```python
import random
from collections import deque

class Elevator:
    def __init__(self, id, max_floor):
        self.id = id
        self.current_floor = 1
        self.destination = 1
        self.passengers = []
        self.max_floor = max_floor
        self.direction = "up"
        self.status = "operational"

    def move(self):
        if self.current_floor < self.destination:
            self.current_floor += 1
            self.direction = "up"
        elif self.current_floor > self.destination:
            self.current_floor -= 1
            self.direction = "down"

    def add_passenger(self, passenger):
        self.passengers.append(passenger)
        self.update_destination()

    def update_destination(self):
        if self.passengers:
            self.destination = max(p.destination for p in self.passengers)
        else:
            self.destination = self.current_floor

class ElevatorSystem:
    def __init__(self, num_elevators, max_floor):
        self.elevators = [Elevator(i, max_floor) for i in range(num_elevators)]
        self.max_floor = max_floor
        self.requests = deque()

    def request_elevator(self, from_floor, to_floor):
        # In a real system, we'd use a more sophisticated algorithm here
        available_elevators = [e for e in self.elevators if e.status == "operational"]
        if available_elevators:
            elevator = min(available_elevators, key=lambda e: abs(e.current_floor - from_floor))
            elevator.add_passenger(Passenger(from_floor, to_floor))
        else:
            self.requests.append((from_floor, to_floor))

    def simulate_step(self):
        for elevator in self.elevators:
            if elevator.status == "operational":
                elevator.move()
                # Handle passenger drop-offs, etc.

        # Handle queued requests if elevators become available
        while self.requests and any(e.status == "operational" for e in self.elevators):
            from_floor, to_floor = self.requests.popleft()
            self.request_elevator(from_floor, to_floor)

class Passenger:
    def __init__(self, start_floor, destination):
        self.start_floor = start_floor
        self.destination = destination

# Usage
system = ElevatorSystem(num_elevators=57, max_floor=163)
for _ in range(1000):  # Simulate 1000 steps
    system.simulate_step()
    if random.random() < 0.1:  # 10% chance of a new request each step
        from_floor = random.randint(1, system.max_floor)
        to_floor = random.randint(1, system.max_floor)
        system.request_elevator(from_floor, to_floor)
```

Obviously this code is a gross oversimplification, but it illustrates the point we are after: managing a distributed system, whether it's elevators or databases, requires designing around resource allocation, fault tolerance, and optimizing. All of this for the global efficiency rather than local optimums.

## Elevating Your Thinking

So, what's the point of this you ask? It's not just to make you think twice next time you're in an elevator (though that's a fun side effect). The real takeaway is about how we approach a seemingly artifical topic of system design at scale, with something that we have a day to day experience of:

1. **Adapt and Predict**: A well designed system, whether it's moving people or data - anticipate needs, adapt to challenge and falls back to the next optimal move.

2. **Think Holistically**: Just as an efficient elevator system considers the entire building, it's layout, where the elevators are places and the high traffic for the floor with the candy shop, we need to design our systems with the big picture in mind as well.

3. **Balance Efficiency and Fairness**: Pure efficiency (like prioritising serving the closest request) can lead to unfairness at large. Your design needs to balance everything with at sometimes competing objectives.

4. **Prepare to Failure**: In any sufficiently complex system, something will go wrong - and eventualy everything will go wrong. Design with redundancy and graceful degradation in mind from the get go.

5. **Optimize, Observe, Optimize**: The job is never done! Just as the smart elevator systems are constantly learning and adjusting themselfs, our data systems should be continuously optimized based on the real-world usage patterns.

Remember that whether you're moving bits or bodies, the principles of efficient, scalable system design remain the same. Next time you're architecting a distributed system - pause and take a moment to think about elevators. Why? Because it might just elevate your solution to new heights.

Now, if you'll excuse me, I still have several floors of data to go through...
