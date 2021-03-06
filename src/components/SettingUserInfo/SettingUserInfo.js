import {useRef, useState} from "react";
import SquareRoundBtn from "../buttons/SquareRoundBtn";
import {userNameRegister} from "../../lib/server/post";
import {useDispatch, useSelector} from "react-redux";
import {change_name} from "../../redux/reducer/userInfo";
import {handleFocus} from "../../lib/inputFocus";
import {close_modal} from "../../redux/reducer/modalState";

function SettingUserInfo() {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userInfo);
    const [pw, setPW] = useState('');
    const [name, setName] = useState(userInfo.name);
    const inputRef = useRef(null);

    async function saveName() {
        const data = await userNameRegister(userInfo.id, userInfo.email, pw, name);
        if (data.status) {
            dispatch(change_name({name: name}));
            dispatch(close_modal());
        } else {
            setPW('')
            handleFocus(inputRef);
            alert(data.message);
        }
    }

    return {
        header: <h4>사용자설정 변경하기</h4>,
        body: <>
            <div>
                <div>Password</div>
                <input placeholder={'비밀번호 입력'}
                       value={pw}
                       onChange={e => setPW(e.target.value)}
                       autoFocus={true}
                       ref={inputRef}/>
            </div>
            <div>
                <div>새로운 닉네임</div>
                <input placeholder={name}
                       onChange={e => setName(e.target.value)}
                       onKeyUp={e => e.keyCode === 13 && saveName()}/>
            </div>
        </>,
        footer: <SquareRoundBtn text={'저장하기'} clickButton={saveName}/>
    }
}

export default SettingUserInfo;