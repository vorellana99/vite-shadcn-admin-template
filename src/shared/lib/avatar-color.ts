const PALETTE = [
    { bg: "bg-rose-100",   text: "text-rose-700"   },
    { bg: "bg-orange-100", text: "text-orange-700"  },
    { bg: "bg-amber-100",  text: "text-amber-700"   },
    { bg: "bg-lime-100",   text: "text-lime-700"    },
    { bg: "bg-emerald-100",text: "text-emerald-700" },
    { bg: "bg-teal-100",   text: "text-teal-700"    },
    { bg: "bg-sky-100",    text: "text-sky-700"     },
    { bg: "bg-violet-100", text: "text-violet-700"  },
    { bg: "bg-pink-100",   text: "text-pink-700"    },
    { bg: "bg-cyan-100",   text: "text-cyan-700"    },
]

export function getInitialsColor(initials: string) {
    let hash = 0
    for (let i = 0; i < initials.length; i++) {
        hash = (hash * 31 + initials.charCodeAt(i)) >>> 0
    }
    return PALETTE[hash % PALETTE.length]
}
