"use client"
import React from 'react';
import Link from 'next/link';

const agents = [
    {
        id: 1,
        name: "Vincent Fuller",
        title: "Real Estate Agent , Country House Real Estate",
        avatar: "/roy.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porta justo eget risus consectetur,...",
        color: "text-[#348b8b]"
    },
    {
        id: 2,
        name: "Brittany Watkins",
        title: "Company Agent , All American Real Estate",
        avatar: "/ken.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porta justo eget risus consectetur,...",
        color: " text-[#348b8b]"
    },
    {
        id: 3,
        name: "Michelle Ramirez",
        title: "Company Agent , Modern House Real Estate",
        avatar: "/kath.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porta justo eget risus consectetur,...",
        color: " text-[#348b8b]"
    }
];

const AgentCard = ({ agent }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="rounded-full overflow-hidden w-36 h-36 mb-4">
                <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-full h-full"
                />
            </div>
            <h3 className={`font-medium text-xl ${agent.color}`}>{agent.name}</h3>
            <p className="text-gray-800 text-center my-2">{agent.title}</p>
            <p className="text-gray-600 text-center max-w-md mb-4">{agent.description}</p>
            <Link href={`/agent/${agent.id}`}>
                <span className=" text-[#348b8b] hover:underline cursor-pointer">View Profile</span>
            </Link>
        </div>
    );
};

const MeetOurAgents = () => {
    return (
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-medium text-gray-800 mb-2">
                        Meet Our Agents
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-sm">
                    <div className="grid md:grid-cols-3 gap-6">
                        {agents.map(agent => (
                            <AgentCard key={agent.id} agent={agent} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll to top button */}
            <div className="fixed bottom-6 right-6">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="bg-[#348b8b] text-white p-3 rounded-md shadow-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default MeetOurAgents;