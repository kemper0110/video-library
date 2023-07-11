import React from "react";
import personIcon from '../assets/person.svg'
import phoneNumberIcon from '../assets/phoneNumber.svg'
import emailIcon from '../assets/email.svg'
import telegramIcon from '../assets/telegram.svg'
import githubIcon from '../assets/github.svg'
import {twMerge} from "tailwind-merge";

interface LiProps extends React.InputHTMLAttributes<HTMLLIElement>{}
const Li = ({children, className, ...liProps}: LiProps) => (
    <li className={twMerge('flex gap-2 items-center', className)} {...liProps}>
        {children}
    </li>
)

interface ImgProps extends React.InputHTMLAttributes<HTMLImageElement> {}
const Img = ({className, alt, ...imgProps}: ImgProps) => (
    <img className={twMerge("w-[20px] h-[20px]", className)} {...imgProps} alt={alt || ""}/>
)

const Footer = () => {
    return (
        <footer className='py-3 bg-gray-700 px-3 text-white '>
            <address>
                <ul className='flex flex-wrap gap-x-6 gap-y-2 mx-auto max-w-[450px] justify-center items-center'>
                    <Li>
                        <Img src={personIcon}/>
                        <h3>
                            Голосуев Данил Витальевич
                        </h3>
                    </Li>
                    <Li>
                        <Img src={phoneNumberIcon}/>
                        <a href='tel:+79525671679' target='_blank'>
                            +7 (952) 567-16-79
                        </a>
                    </Li>
                    <Li>
                        <Img src={emailIcon}/>
                        <a href="mailto:danil2003.2043@gmail.com?subject=Предложение о сотрудничестве" target='_blank'>
                            danil2003.2043@gmail.com
                        </a>
                    </Li>
                    <Li>
                        <Img src={telegramIcon}/>
                        <a href='https://t.me/d4n11g' target='_blank'>
                            @d4n11g
                        </a>
                    </Li>
                    <Li>
                        <Img src={githubIcon}/>
                        <a href='https://github.com/kemper0110' target='_blank'>
                            /kemper0110
                        </a>
                    </Li>
                </ul>
            </address>
        </footer>
    );
};

export default Footer;