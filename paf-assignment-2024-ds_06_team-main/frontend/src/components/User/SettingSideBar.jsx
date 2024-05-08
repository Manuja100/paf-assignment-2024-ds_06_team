import Button from '@mui/material/Button';
import {FaUser} from 'react-icons/fa';
import {SlUserFollow} from "react-icons/sl";
import { IoMdPhotos,IoMdHelpCircle } from "react-icons/io";
import { BiSolidVideos } from "react-icons/bi";
import { RxActivityLog } from "react-icons/rx";
import { MdFeedback } from "react-icons/md";
import '../../App.css';


const SettingSideBar = () => {

    return (
        <>
        <div className ="sidebarWrapper">
        <div className = "sidebar">
            <ul>
                <li>
                    <Button>
                        <span className = 'icon'><FaUser/></span>
                        Account 
                    </Button>
                </li>
                <li>
                    <Button>
                        <span className = 'icon'><SlUserFollow/></span>
                        Followers
                    </Button>
                </li>
                <li>
                    <Button>
                        <span className = 'icon'><IoMdPhotos/></span>
                        Photos
                    </Button>
                </li>
                <li>
                    <Button>
                        <span className = 'icon'><BiSolidVideos/></span>
                        Videos
                    </Button>
                </li>
                <li>
                    <Button>
                        <span className = 'icon'><RxActivityLog/></span>
                        Activity Log
                    </Button>
                </li>
                <li>
                    <Button>
                        <span className = 'icon'><IoMdHelpCircle/></span>
                        Help & Support Center
                    </Button>
                </li>
                <li>
                    <Button>
                        <span className = 'icon'><MdFeedback /></span>
                        FeedBack
                    </Button>
                </li>
            </ul>
        </div>
        </div>
        </>
    )
};

export default SettingSideBar;
