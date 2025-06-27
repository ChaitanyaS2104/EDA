import Image from 'next/image';
import { useState } from 'react';

export default function ProfileCard() {
    return (<>
        <div className="profile_card text-white w-sm">
            <div className="profile_details">
                <div className="text-lg text-white">Chaitanya Shankar</div>
                <p className="text-sm text-gray-300">SE Electronics & Computer Science | Web Dev & ML Enthusiast</p>

                <div className="flex flex-row gap-2">
                    <a href="https://github.com/ChaitanyaS21"><Image src="/assets/github.svg" width={25} height={25} alt='Github'/></a>
                    <a href="https://www.linkedin.com/in/chaitanya-shankar-687187348"><Image src="/assets/linkedin.svg"  width={25} height={25} alt='LinkedIn'/></a>
                </div>

            </div>
        </div>
    </>

    );
}
