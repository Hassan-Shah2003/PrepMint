import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PrepItem = ({ item, onClick }) => (
    
    <button
        onClick={() => onClick && onClick(item)}
        className="group flex w-full items-center justify-between rounded-lg border border-white/6 bg-[#111012]/60 p-3 text-left transition hover:scale-[1.01] cursor-pointer"
    >
        <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#281728] text-[#ff88bb]">📄</div>
            <div>
                <div className="font-semibold text-sm text-white">{item.title}</div>
                <div className="text-xs text-gray-400">{item.company} · {item.time}</div>
            </div>
        </div>
        <div className="text-gray-400">›</div>
    </button>
);

const RecentPrep = ({ items }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleSeeAll = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-pink-400">Recent Prep</h4>
                <button onClick={handleSeeAll} className="text-sm font-semibold text-pink-400 hover:underline">See All</button>
            </div>

            <div className="mt-3 grid gap-3">
                {items.slice(0, 3).map((it) => (
                    <PrepItem key={it.id} item={it} onClick={() => navigate(`/interview/${it.id}`)} />
                ))}
            </div>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/60" onClick={handleClose} />
                    <div className="relative mx-4 max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-[#0f0b13] p-4 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold">All Recent Prep</h3>
                            <button onClick={handleClose} className="text-sm text-gray-400 cursor-pointer">Close</button>
                        </div>
                        <div className="divide-y divide-white/6 max-h-[70vh] overflow-y-auto pr-2">
                            {items.map((it) => (
                                <div key={it.id} className="py-3">
                                    <PrepItem item={it} onClick={() => { 
                                        handleClose();
                                        navigate(`/interview/${it.id}`)
                                    }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecentPrep;
