---
title: "The Port Party: A Crash Course on Ephemeral Ports and Their Security Implications"
date: 2023-12-04T00:00:00+05:30
basecolor: "#007bff"
author: "Mayank Raj"
category: "networking"
bgimage: "ephemeral-ports-in-the-network-stack"
page_slug: "/blog/ephemeral-ports-in-the-network-stack"
abstract: "Ephemeral ports are often overlooked yet overworked heros of the distributed systems. This blog post dives deep into the ephemeral ports, exploring how they interact with other components like load balancers, NAT gateways, and proxies. Explore potential pitfalls like port exhaustion as well as how to avoid them through configuration, monitoring, and performance tuning. We also delve into the security considerations and explore topics like firewalls, network segmentation and potential vulnerabilities. Gain insights into fine-tuning your system for performance, scalability, and security. All this while keeping those ephemeral ports from ruining your game."
keywords: "ephemeral ports, network address translation (NAT), load balancers, proxies, port exhaustion, security considerations, firewall rules, network segmentation, distributed systems, performance tuning, scalability, networking, security"
draft: false
todo: followup with a post on how to configure and debug ephermal ports
---

# The Port Party: A Crash Course on Ephemeral Ports

Let's continue our deep dive into a critical, yet often overlooked aspect of distributed systems — ephemeral ports. We looked at what they are with [Journey Through the Silicon](/blog/ephemeral-ports/) and also looked at proxies with [From Forward to Reverse Proxies](/blog/forward-reverse-proxy-explained/). Let's look at how these two play with each other. Ephemeral ports are always in the backstage control room, but trust me, you don't want to ignore them. They might be small, but they can cause big problems if you don't understand how they work.

Think of ephemeral ports as the temporary phone numbers used by your client applications to communicate with the servers. Each time any client initiates a connection, the operating system assigns it a port number randomly picked from a reserved range. These ports are tightly coupled with this connection and only active during the connection lifetime — hence the name "ephemeral". When the job is done, the port is put back in the bowl to be picked up for another connection.

So, why should you care? After all these are temporary, ever-changing ports often short lived for the lifecycle of the connection. Well - Because they play a crucial role in making sure a smooth communication in distributed systems can take place. They are the reason for the connection to happen in the first place. You wouldn't want your shiny new fancy distributed application to become a tangled mess, right?

### Load Balancers: Who Let the Port-Numbers Out !?

Let's say you have a bunch of servers, which host your backend. These are the army powering your distributed application. How do you direct traffic to them efficiently? Cue the load balancer, the overworked traffic cop that takes all the incoming connections and splits them evenly across your servers.

Load balancers are typically deployed in front of your backend services as the first line of defence. Today load balancers can also operate at Layer 7, which means they not only distribute the incoming traffic, but have the ability to peek inside the request. This also means they have to terminate the incoming request from the client, and establish a new one with your servers.

When a client request comes in, the load balancer assigns it a unique ephemeral port at its level. It then directs it to an appropriate backend server. It's like the load balancer gives each client a temporary phone number, and then connects them to the right server based on its internal routing logic.

Load balancers, a type of proxies was discussed in much more details over at [From Forward to Reverse Proxies](/blog/forward-reverse-proxy-explained/).

#### Sticky Sessions: The Double-Edged Sword of Performance

Applications are not always built "ideal". Some end up having session state stored locally on the server. To tackle this one common strategy used by load balancers is "sticky sessions." It makes sure to keep a client connected to the same server throughout a series of requests. This can improve performance by utilizing cached data which is tied to a given server. Imagine a shopping cart: just because developers choose to use a load balancer, you don't want to start adding items on one server and then end up on a different one at checkout, right? That would be a recipe for a frustrated customer (and potentially a lost sale)!

To flip the coin around, sticky sessions can cause issues too. If the server that a given client's request is attached to goes down, the load balancer needs to find a new server and new port. This could potentially disrupt the client's ongoing session. To add to it, if you have a slow server, all the clients stuck on it will experience performance problems as sticky sessions will not allow them to go to another server. It's like having the party guest stuck in a slow moving elevator - everyone is late to the party, and with that the fun is getting disrupted.

### NAT Gateways: Translating Traffic Like a Pro (With Some Ephemeral Magic)

Ever heard of NAT? No !? It stands for Network Address Translation. It's a common means for hiding internal IP addresses from the wild outside world. NAT gateways behave like translation services - they are constantly converting the client's IP address and port to different ones, so that your internal servers can communicate safely. Above all, all of this without exposing themselves directly to the clients.

Usually NAT gateways utilize SNAT (Source Network Address Translation) to rewrite the source IP address and port. Think of it as the gateway taking your client's phone number, switching it up, and then giving it to the server. Generally only the NAT has these mapping with it. This helps protect your internal network while maintaining communication flow. The ports are allocated at NAT level, for either end of the communication.

#### The Ephemeral Port Pool: A Shared Resource

But just like life - there's a catch. NAT gateways often use ephemeral ports for this translation process. This ends up creating an ephemeral port pool which is then shared across all translated connections. What this means is that when your gateway is handling a ton of traffic, it can run into issues with port exhaustion. This in turn could lead to dropped connections or performance degradation. It's like everyone wants Sheldon's spot because it's ..well ..the perfect spot - it's a recipe for chaos!

#### Tuning NAT Gateways for Optimal Performance

Just like with Linux iptables, NAT gateways can be tweaked as well which can help improve their performance. The key here is to configure the appropriate values for ephemeral ports, connection timeout, etc which eventually can lead to optimizing the translation process. All of this will significantly impact your NAT's ability to scale and respond. NAT should be a part of the stack that are not noticed by anyone. You should be able to set it and forget it. So time spent in optimisations here are well worth it.

### Proxies: Middleman or Bottleneck? How Ephemeral Ports Behave in Proxy Scenarios

Proxies act as intermediaries between the clients and servers. When set as forward proxies they are forwarding requests from clients to servers. When as reverse proxies they end up as a gateway to your backend services. It's like having a friendly bartender who takes orders from guests and delivers them to the kitchen. It's forwarding requests from one point-of-view, and proxying request from the others.

When a client makes a request via a proxy, the proxy will almost certainly assign an ephemeral port to manage this connection. What this means is that the proxy becomes a temporary relay station, handling the traffic flowing between the client and the server. On the other hand, if the proxy isn't configured appropriately, it can create a bottleneck, especially when dealing with a high volume of requests. This is where tuning knobs like HTTP keep-alive, connection pooling etc come into play. They can not only help reduce the burden on the proxy but also improve efficiency. You always choose to have your Amazon packages be delivered in "fewer boxes" right ? Why not do the same with your network packages?

#### Proxy Technologies: A Choice of Tools

Choices are everywhere, and proxies are not behind. Popular technologies like Squid, Varnish Cache, and HAProxy are often used in large scale distributed systems. These offer different features and optimizations like connection pooling, caching, load balancing and more. All of these can be critical for managing ephemeral ports effectively. And as we have seen time and again - managing ephemeral ports are key to seamless operations.

### Scaling Shenanigans: How Ephemeral Ports Affect Distributed System Performance

In the world of distributed systems, scaling is the buzzword. And ephemeral ports play a crucial role in achieving high performance and scalability. But they can also end up being the source of unexpected performance issues, particularly in a high-throughput environments.

#### Real-World Examples: Port Exhaustion in Action

Consider a large online website handling a massive influx of traffic during a concert ticket sale. You have been there, haven't you? The requests come in all-at-once, quite literally. The system might experience port exhaustion due to the overwhelming number of connections being established via the load balancers, NAT gateways and proxies. This can lead to connections being dropped, throttling and overall customer frustration.

#### Performance Tuning Tips: Avoiding Port Starvation

In my experience the best way to avoid port exhaustion, is to consider the following...

- **Increase Ephemeral Port Range:** Expand the range of ports available for ephemeral use. Every system has a certain number of ports, and when you know that the server would need a high number of port - it's best to allocate it ahead of time.
- **Use Connection Pooling:** Tackle the problem at the source - reduce the number of connections established in the first place. Reusing existing connections wherever possible.
- **Setup Load Balancing:** Optimize the load balancing algorithms. If the load balancer can make sure all the available resources are used optimally, you won't have to scale any one individually or overallocate.
- **Monitor Port Usage:** Track ephemeral port usage, so that you can identify potential bottlenecks ahead of time and address them. Remember - logs, logs and even more logs.

### Security Considerations: Guarding Your Port Party

Ephemeral ports facilitate communication but they also pose a major security challenges. If a bad actor knows that ephermal ports will be used for the requests, it could be worthwhile to check "all" the ports - maybe once in a while the bad actor will hit gold! Ephemeral ports can be vulnerable to various attacks like port scanning, port exhaustion attacks, and brute force attacks.

**Firewall Rules:** Firewall rules can be used to limit access to specific ports. Thus restricting connections from unauthorized sources.

**Network Segmentation:** Breaking up the network into smaller, isolated segments help prevent malicious attacks from spreading. This also reduces the blast radius.

### At last - Avoiding Ephemeral Port Hell

Ephemeral ports are crucial components of the modern distributed system stack. Better understanding how they work within components like load balancers, NAT gateways and proxies is the key to building reliable and scalable applications. Avoiding common pitfalls like port exhaustion and properly configuring your infrastructure, can ensure that your system operates as it is designed to.

Remember, ephemeral ports might be small behind the scenes players, but they have a big impact on your overall performance. So, be aware of them when designing your applications. Don't let those pesky little ephemeral ports turn your system into a party gone wrong!
