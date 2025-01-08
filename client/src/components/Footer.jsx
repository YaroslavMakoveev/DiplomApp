import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';

function Footer() {
    return (
        <footer style={{ backgroundColor: '#f8f9fa', padding: '20px 0', marginTop: '20px' }}>
            <Container>
                <Row>
                    <Col md={3}>
                        <h5>Навигация по сайту</h5>
                        <Nav style={{display: 'flex', flexDirection: 'column', color: '#000'}}>
                            <Nav.Link href="/" style={{color: '#000'}}>Главная</Nav.Link>
                            <Nav.Link href="#pricing" style={{color: '#000'}}>Новости</Nav.Link>
                            <Nav.Link href="#pricing" style={{color: '#000'}}>Расписание турниров</Nav.Link>
                        </Nav>
                    </Col>
                    
                    <Col md={6} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <svg width="181" height="175" viewBox="0 0 181 175" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="19.8652" width="178.989" height="39.7754" rx="19.8877" fill="#2B7BD8"/>
                            <rect y="19.8652" width="39.7754" height="79.5508" rx="19.8877" fill="#2B7BD8"/>
                            <rect x="1.98877" y="115.326" width="178.989" height="39.7754" rx="19.8877" fill="#B03C2A"/>
                            <rect x="141.203" y="75.5508" width="39.7754" height="79.5508" rx="19.8877" fill="#B03C2A"/>
                            <circle cx="62.6463" cy="92.4554" r="18.8933" fill="#B03C2A"/>
                            <path d="M137.225 82.5115C137.225 92.946 128.766 101.405 118.332 101.405C107.897 101.405 99.4386 92.946 99.4386 82.5115C99.4386 72.077 107.897 63.6182 118.332 63.6182C128.766 63.6182 137.225 72.077 137.225 82.5115Z" fill="#2B7BD8"/>
                            <path d="M28.29 11.255L27.525 12.02V3.5H31.005V12.02L30.225 11.255H33.885L33.105 12.02V3.5H36.585V14H21.93V3.5H25.41V12.02L24.645 11.255H28.29ZM44.8888 14L42.2788 9.08L45.0988 7.43L48.8788 14H44.8888ZM38.3488 14V3.5H41.8888V14H38.3488ZM40.8688 10.205V7.415H44.8438V10.205H40.8688ZM45.4438 9.125L42.1888 8.795L45.2038 3.5H48.8938L45.4438 9.125ZM54.8677 14.24C54.0177 14.24 53.2277 14.105 52.4977 13.835C51.7777 13.565 51.1527 13.185 50.6227 12.695C50.0927 12.195 49.6777 11.61 49.3777 10.94C49.0877 10.27 48.9427 9.54 48.9427 8.75C48.9427 7.95 49.0877 7.22 49.3777 6.56C49.6777 5.89 50.0927 5.31 50.6227 4.82C51.1527 4.32 51.7777 3.935 52.4977 3.665C53.2277 3.395 54.0177 3.26 54.8677 3.26C55.7277 3.26 56.5177 3.395 57.2377 3.665C57.9577 3.935 58.5827 4.32 59.1127 4.82C59.6427 5.31 60.0527 5.89 60.3427 6.56C60.6427 7.22 60.7927 7.95 60.7927 8.75C60.7927 9.54 60.6427 10.27 60.3427 10.94C60.0527 11.61 59.6427 12.195 59.1127 12.695C58.5827 13.185 57.9577 13.565 57.2377 13.835C56.5177 14.105 55.7277 14.24 54.8677 14.24ZM54.8677 11.375C55.1977 11.375 55.5027 11.315 55.7827 11.195C56.0727 11.075 56.3227 10.905 56.5327 10.685C56.7527 10.455 56.9227 10.18 57.0427 9.86C57.1627 9.53 57.2227 9.16 57.2227 8.75C57.2227 8.34 57.1627 7.975 57.0427 7.655C56.9227 7.325 56.7527 7.05 56.5327 6.83C56.3227 6.6 56.0727 6.425 55.7827 6.305C55.5027 6.185 55.1977 6.125 54.8677 6.125C54.5377 6.125 54.2277 6.185 53.9377 6.305C53.6577 6.425 53.4077 6.6 53.1877 6.83C52.9777 7.05 52.8127 7.325 52.6927 7.655C52.5727 7.975 52.5127 8.34 52.5127 8.75C52.5127 9.16 52.5727 9.53 52.6927 9.86C52.8127 10.18 52.9777 10.455 53.1877 10.685C53.4077 10.905 53.6577 11.075 53.9377 11.195C54.2277 11.315 54.5377 11.375 54.8677 11.375ZM62.5538 14.195C62.3338 14.195 62.0988 14.18 61.8488 14.15C61.5988 14.12 61.3338 14.07 61.0538 14L61.2338 11.165C61.3738 11.195 61.5038 11.21 61.6238 11.21C62.0138 11.21 62.3038 11.05 62.4938 10.73C62.6838 10.41 62.8138 9.98 62.8838 9.44C62.9538 8.89 62.9988 8.275 63.0188 7.595L63.1538 3.5H72.0188V14H68.5388V5.495L69.3038 6.245H65.4788L66.1688 5.45L66.1088 7.46C66.0788 8.47 66.0088 9.39 65.8988 10.22C65.7988 11.04 65.6238 11.75 65.3738 12.35C65.1238 12.94 64.7688 13.395 64.3088 13.715C63.8588 14.035 63.2738 14.195 62.5538 14.195ZM72.9884 14L77.5784 3.5H81.0584L85.6484 14H81.9884L78.5984 5.18H79.9784L76.5884 14H72.9884ZM75.7184 12.17L76.6184 9.62H81.4484L82.3484 12.17H75.7184ZM96.3946 14.24C95.5546 14.24 94.7746 14.11 94.0546 13.85C93.3446 13.58 92.7246 13.2 92.1946 12.71C91.6746 12.22 91.2696 11.64 90.9796 10.97C90.6896 10.3 90.5446 9.56 90.5446 8.75C90.5446 7.94 90.6896 7.2 90.9796 6.53C91.2696 5.86 91.6746 5.28 92.1946 4.79C92.7246 4.3 93.3446 3.925 94.0546 3.665C94.7746 3.395 95.5546 3.26 96.3946 3.26C97.4246 3.26 98.3346 3.44 99.1246 3.8C99.9246 4.16 100.585 4.68 101.105 5.36L98.8696 7.355C98.5596 6.965 98.2146 6.665 97.8346 6.455C97.4646 6.235 97.0446 6.125 96.5746 6.125C96.2046 6.125 95.8696 6.185 95.5696 6.305C95.2696 6.425 95.0096 6.6 94.7896 6.83C94.5796 7.06 94.4146 7.34 94.2946 7.67C94.1746 7.99 94.1146 8.35 94.1146 8.75C94.1146 9.15 94.1746 9.515 94.2946 9.845C94.4146 10.165 94.5796 10.44 94.7896 10.67C95.0096 10.9 95.2696 11.075 95.5696 11.195C95.8696 11.315 96.2046 11.375 96.5746 11.375C97.0446 11.375 97.4646 11.27 97.8346 11.06C98.2146 10.84 98.5596 10.535 98.8696 10.145L101.105 12.14C100.585 12.81 99.9246 13.33 99.1246 13.7C98.3346 14.06 97.4246 14.24 96.3946 14.24ZM101.143 14L105.733 3.5H109.213L113.803 14H110.143L106.753 5.18H108.133L104.743 14H101.143ZM103.873 12.17L104.773 9.62H109.603L110.503 12.17H103.873ZM114.772 14V3.5H117.682L121.882 10.355H120.352L124.432 3.5H127.342L127.372 14H124.147L124.117 8.36H124.627L121.837 13.055H120.277L117.367 8.36H117.997V14H114.772ZM129.215 14V3.5H138.32V6.17H132.695V7.385H135.2C136.48 7.385 137.46 7.66 138.14 8.21C138.83 8.75 139.175 9.535 139.175 10.565C139.175 11.635 138.785 12.475 138.005 13.085C137.225 13.695 136.14 14 134.75 14H129.215ZM132.695 11.525H134.51C134.86 11.525 135.13 11.45 135.32 11.3C135.52 11.15 135.62 10.935 135.62 10.655C135.62 10.115 135.25 9.845 134.51 9.845H132.695V11.525ZM145.732 14.24C144.882 14.24 144.092 14.105 143.362 13.835C142.642 13.565 142.017 13.185 141.487 12.695C140.957 12.195 140.542 11.61 140.242 10.94C139.952 10.27 139.807 9.54 139.807 8.75C139.807 7.95 139.952 7.22 140.242 6.56C140.542 5.89 140.957 5.31 141.487 4.82C142.017 4.32 142.642 3.935 143.362 3.665C144.092 3.395 144.882 3.26 145.732 3.26C146.592 3.26 147.382 3.395 148.102 3.665C148.822 3.935 149.447 4.32 149.977 4.82C150.507 5.31 150.917 5.89 151.207 6.56C151.507 7.22 151.657 7.95 151.657 8.75C151.657 9.54 151.507 10.27 151.207 10.94C150.917 11.61 150.507 12.195 149.977 12.695C149.447 13.185 148.822 13.565 148.102 13.835C147.382 14.105 146.592 14.24 145.732 14.24ZM145.732 11.375C146.062 11.375 146.367 11.315 146.647 11.195C146.937 11.075 147.187 10.905 147.397 10.685C147.617 10.455 147.787 10.18 147.907 9.86C148.027 9.53 148.087 9.16 148.087 8.75C148.087 8.34 148.027 7.975 147.907 7.655C147.787 7.325 147.617 7.05 147.397 6.83C147.187 6.6 146.937 6.425 146.647 6.305C146.367 6.185 146.062 6.125 145.732 6.125C145.402 6.125 145.092 6.185 144.802 6.305C144.522 6.425 144.272 6.6 144.052 6.83C143.842 7.05 143.677 7.325 143.557 7.655C143.437 7.975 143.377 8.34 143.377 8.75C143.377 9.16 143.437 9.53 143.557 9.86C143.677 10.18 143.842 10.455 144.052 10.685C144.272 10.905 144.522 11.075 144.802 11.195C145.092 11.315 145.402 11.375 145.732 11.375Z" fill="#B03C2A"/>
                            <path d="M48.21 169.24C47.37 169.24 46.59 169.11 45.87 168.85C45.16 168.58 44.54 168.2 44.01 167.71C43.49 167.22 43.085 166.64 42.795 165.97C42.505 165.3 42.36 164.56 42.36 163.75C42.36 162.94 42.505 162.2 42.795 161.53C43.085 160.86 43.49 160.28 44.01 159.79C44.54 159.3 45.16 158.925 45.87 158.665C46.59 158.395 47.37 158.26 48.21 158.26C49.24 158.26 50.15 158.44 50.94 158.8C51.74 159.16 52.4 159.68 52.92 160.36L50.685 162.355C50.375 161.965 50.03 161.665 49.65 161.455C49.28 161.235 48.86 161.125 48.39 161.125C48.02 161.125 47.685 161.185 47.385 161.305C47.085 161.425 46.825 161.6 46.605 161.83C46.395 162.06 46.23 162.34 46.11 162.67C45.99 162.99 45.93 163.35 45.93 163.75C45.93 164.15 45.99 164.515 46.11 164.845C46.23 165.165 46.395 165.44 46.605 165.67C46.825 165.9 47.085 166.075 47.385 166.195C47.685 166.315 48.02 166.375 48.39 166.375C48.86 166.375 49.28 166.27 49.65 166.06C50.03 165.84 50.375 165.535 50.685 165.145L52.92 167.14C52.4 167.81 51.74 168.33 50.94 168.7C50.15 169.06 49.24 169.24 48.21 169.24ZM56.3013 169V160.48L57.0663 161.245H53.2263V158.5H62.8563V161.245H59.0163L59.7813 160.48V169H56.3013ZM62.6114 169L67.2014 158.5H70.6814L75.2714 169H71.6114L68.2214 160.18H69.6014L66.2114 169H62.6114ZM65.3414 167.17L66.2414 164.62H71.0714L71.9714 167.17H65.3414ZM76.2405 169V158.5H81.5655C82.8655 158.5 83.8705 158.74 84.5805 159.22C85.3005 159.7 85.6605 160.375 85.6605 161.245C85.6605 162.095 85.3305 162.77 84.6705 163.27C84.0105 163.76 83.1205 164.005 82.0005 164.005L82.3005 163.195C83.4905 163.195 84.4255 163.43 85.1055 163.9C85.7855 164.37 86.1255 165.055 86.1255 165.955C86.1255 166.885 85.7555 167.625 85.0155 168.175C84.2755 168.725 83.2205 169 81.8505 169H76.2405ZM79.7205 166.525H81.6855C81.9755 166.525 82.1905 166.455 82.3305 166.315C82.4805 166.165 82.5555 165.955 82.5555 165.685C82.5555 165.415 82.4805 165.215 82.3305 165.085C82.1905 164.945 81.9755 164.875 81.6855 164.875H79.7205V166.525ZM79.7205 162.535H81.2205C81.5205 162.535 81.7405 162.47 81.8805 162.34C82.0205 162.21 82.0905 162.02 82.0905 161.77C82.0905 161.51 82.0205 161.315 81.8805 161.185C81.7405 161.045 81.5205 160.975 81.2205 160.975H79.7205V162.535ZM87.388 169V158.5H92.443C93.423 158.5 94.268 158.66 94.978 158.98C95.698 159.3 96.253 159.76 96.643 160.36C97.033 160.95 97.228 161.65 97.228 162.46C97.228 163.27 97.033 163.97 96.643 164.56C96.253 165.15 95.698 165.61 94.978 165.94C94.268 166.26 93.423 166.42 92.443 166.42H89.353L90.928 164.905V169H87.388ZM90.928 165.295L89.353 163.69H92.218C92.708 163.69 93.068 163.58 93.298 163.36C93.538 163.14 93.658 162.84 93.658 162.46C93.658 162.08 93.538 161.78 93.298 161.56C93.068 161.34 92.708 161.23 92.218 161.23H89.353L90.928 159.625V165.295ZM103.788 169.24C102.938 169.24 102.148 169.105 101.418 168.835C100.698 168.565 100.073 168.185 99.5426 167.695C99.0126 167.195 98.5976 166.61 98.2976 165.94C98.0076 165.27 97.8626 164.54 97.8626 163.75C97.8626 162.95 98.0076 162.22 98.2976 161.56C98.5976 160.89 99.0126 160.31 99.5426 159.82C100.073 159.32 100.698 158.935 101.418 158.665C102.148 158.395 102.938 158.26 103.788 158.26C104.648 158.26 105.438 158.395 106.158 158.665C106.878 158.935 107.503 159.32 108.033 159.82C108.563 160.31 108.973 160.89 109.263 161.56C109.563 162.22 109.713 162.95 109.713 163.75C109.713 164.54 109.563 165.27 109.263 165.94C108.973 166.61 108.563 167.195 108.033 167.695C107.503 168.185 106.878 168.565 106.158 168.835C105.438 169.105 104.648 169.24 103.788 169.24ZM103.788 166.375C104.118 166.375 104.423 166.315 104.703 166.195C104.993 166.075 105.243 165.905 105.453 165.685C105.673 165.455 105.843 165.18 105.963 164.86C106.083 164.53 106.143 164.16 106.143 163.75C106.143 163.34 106.083 162.975 105.963 162.655C105.843 162.325 105.673 162.05 105.453 161.83C105.243 161.6 104.993 161.425 104.703 161.305C104.423 161.185 104.118 161.125 103.788 161.125C103.458 161.125 103.148 161.185 102.858 161.305C102.578 161.425 102.328 161.6 102.108 161.83C101.898 162.05 101.733 162.325 101.613 162.655C101.493 162.975 101.433 163.34 101.433 163.75C101.433 164.16 101.493 164.53 101.613 164.86C101.733 165.18 101.898 165.455 102.108 165.685C102.328 165.905 102.578 166.075 102.858 166.195C103.148 166.315 103.458 166.375 103.788 166.375ZM110.987 169V158.5H116.312C117.612 158.5 118.617 158.74 119.327 159.22C120.047 159.7 120.407 160.375 120.407 161.245C120.407 162.095 120.077 162.77 119.417 163.27C118.757 163.76 117.867 164.005 116.747 164.005L117.047 163.195C118.237 163.195 119.172 163.43 119.852 163.9C120.532 164.37 120.872 165.055 120.872 165.955C120.872 166.885 120.502 167.625 119.762 168.175C119.022 168.725 117.967 169 116.597 169H110.987ZM114.467 166.525H116.432C116.722 166.525 116.937 166.455 117.077 166.315C117.227 166.165 117.302 165.955 117.302 165.685C117.302 165.415 117.227 165.215 117.077 165.085C116.937 164.945 116.722 164.875 116.432 164.875H114.467V166.525ZM114.467 162.535H115.967C116.267 162.535 116.487 162.47 116.627 162.34C116.767 162.21 116.837 162.02 116.837 161.77C116.837 161.51 116.767 161.315 116.627 161.185C116.487 161.045 116.267 160.975 115.967 160.975H114.467V162.535ZM127.474 169.24C126.624 169.24 125.834 169.105 125.104 168.835C124.384 168.565 123.759 168.185 123.229 167.695C122.699 167.195 122.284 166.61 121.984 165.94C121.694 165.27 121.549 164.54 121.549 163.75C121.549 162.95 121.694 162.22 121.984 161.56C122.284 160.89 122.699 160.31 123.229 159.82C123.759 159.32 124.384 158.935 125.104 158.665C125.834 158.395 126.624 158.26 127.474 158.26C128.334 158.26 129.124 158.395 129.844 158.665C130.564 158.935 131.189 159.32 131.719 159.82C132.249 160.31 132.659 160.89 132.949 161.56C133.249 162.22 133.399 162.95 133.399 163.75C133.399 164.54 133.249 165.27 132.949 165.94C132.659 166.61 132.249 167.195 131.719 167.695C131.189 168.185 130.564 168.565 129.844 168.835C129.124 169.105 128.334 169.24 127.474 169.24ZM127.474 166.375C127.804 166.375 128.109 166.315 128.389 166.195C128.679 166.075 128.929 165.905 129.139 165.685C129.359 165.455 129.529 165.18 129.649 164.86C129.769 164.53 129.829 164.16 129.829 163.75C129.829 163.34 129.769 162.975 129.649 162.655C129.529 162.325 129.359 162.05 129.139 161.83C128.929 161.6 128.679 161.425 128.389 161.305C128.109 161.185 127.804 161.125 127.474 161.125C127.144 161.125 126.834 161.185 126.544 161.305C126.264 161.425 126.014 161.6 125.794 161.83C125.584 162.05 125.419 162.325 125.299 162.655C125.179 162.975 125.119 163.34 125.119 163.75C125.119 164.16 125.179 164.53 125.299 164.86C125.419 165.18 125.584 165.455 125.794 165.685C126.014 165.905 126.264 166.075 126.544 166.195C126.834 166.315 127.144 166.375 127.474 166.375Z" fill="#2B7BD8"/>
                        </svg>
                    </Col>
                    
                    <Col md={3}style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <h5>Контакты</h5>
                        <p>Адрес: ул. Примерная, 123, г. Примерск</p>
                        <p>Телефон: +7 (123) 456-78-90</p>
                        <p>Email: info@samboschool.ru</p>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col className="text-center">
                        <p>&copy; {new Date().getFullYear()} Ставровская Школа Самбо. Все права защищены.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
