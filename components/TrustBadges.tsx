import React from 'react';

const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 018.618 3.04 11.955 11.955 0 018.618-3.04 12.02 12.02 0 00-3-14.964z" />
    </svg>
)

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
)

const CheckBadgeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path fillRule="evenodd" d="M8.257 3.099c.625-1.096 2.14-1.096 2.766 0l.473.828a2.25 2.25 0 002.086 1.487l.95-.088c1.17-.11 2.24.833 2.13 2.003l-.088.95a2.25 2.25 0 001.487 2.086l.828.473c1.096.625 1.096 2.14 0 2.766l-.828.473a2.25 2.25 0 00-1.487 2.086l.088.95c.11 1.17-.833 2.24-2.003 2.13l-.95-.088a2.25 2.25 0 00-2.086 1.487l-.473.828c-.625 1.096-2.14 1.096-2.766 0l-.473-.828a2.25 2.25 0 00-2.086-1.487l-.95.088c-1.17.11-2.24-.833-2.13-2.003l.088-.95a2.25 2.25 0 00-1.487-2.086l-.828-.473c-1.096-.625-1.096-2.14 0-2.766l.828-.473a2.25 2.25 0 001.487-2.086l-.088-.95c-.11-1.17.833-2.24 2.003-2.13l.95.088a2.25 2.25 0 002.086-1.487l.473-.828z" clipRule="evenodd" />
        <path d="M14.25 9.75L11.25 12.75l-1.5-1.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)


const badges = [
    { icon: <ShieldIcon />, text: "Fully Insured & Covered" },
    { icon: <StarIcon />, text: "5-Star Customer Rated" },
    { icon: <CheckBadgeIcon />, text: "WorkSafeNB Compliant" },
]

const TrustBadges: React.FC = () => {
    return (
        <div className="bg-white">
            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {badges.map(badge => (
                         <div key={badge.text} className="flex items-center justify-center gap-4">
                            {badge.icon}
                            <p className="font-semibold text-lg text-gray-700">{badge.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TrustBadges;