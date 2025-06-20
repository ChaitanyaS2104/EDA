import Image from 'next/image';
import { useState } from 'react';

export default function ProfileCard() {
    const [showCard, setShowCard] = useState(false);

    return (<>
        <div className="profile_card flex-row">
            <Image
                src="https://avatars.githubusercontent.com/u/00000000?v=4"
                alt="Profile"
                className="github_account_img"
                width={80}
                height={80}
            />
            <div className="profile_details">
                <div className="name">Chaitanya Shankar</div>
                <p className="desc">SE Electronics & Computer Science | Web Dev & ML Enthusiast</p>

                <div className="links">
                    <a href="https://github.com/ChaitanyaS21"><Image src="/assets/github.svg" className='github' width={25} height={25} alt='Github'/></a>
                    <a href="https://www.linkedin.com/in/chaitanya-shankar-687187348"><Image src="/assets/linkedin.svg" className='github' width={25} height={25} alt='LinkedIn'/></a>
                </div>

            </div>
        </div>
    </>

    );
}
