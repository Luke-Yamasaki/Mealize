
export const Footer = () => {
    return (
        <div style={{maxWidth: '1336px', width: '100vw', height: '400px', backgroundColor: '#76D97E', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'left', fontFamily: 'motiva-sans, sans-serif'}}>
            <div style={{maxWidth: '1326px', width: 'calc(100vw - 10px)', height: '300px', display: 'flex', flexDirection: 'row', alignItems: 'top', justifyContent: 'flex-start', gap: '10px', paddingLeft: '10px'}}>
                <ul style={{fontSize: '21px', fontWeight: '900'}}>
                    <p style={{fontSize: '21px', fontWeight: '900', textDecoration: 'underline'}}>Technology</p>
                    <li style={{listStyle: 'none', fontSize: '14px', fontWeight: '700', textDecoration: 'none'}}><p>React / Redux</p></li>
                    <li style={{listStyle: 'none', fontSize: '14px', fontWeight: '700', textDecoration: 'none'}}><p>Flask</p></li>
                    <li style={{listStyle: 'none', fontSize: '14px', fontWeight: '700', textDecoration: 'none'}}><p>SQLAlchemy</p></li>
                    <li style={{listStyle: 'none', fontSize: '14px', fontWeight: '700', textDecoration: 'none'}}><p>AWS / S3</p></li>
                    <li style={{listStyle: 'none', fontSize: '14px', fontWeight: '700', textDecoration: 'none'}}><p>Adobe Illustrator</p></li>
                    <li style={{listStyle: 'none', fontSize: '14px', fontWeight: '700', textDecoration: 'none'}}><p>Adobe XD</p></li>
                </ul>
                <ul style={{fontSize: '21px', fontWeight: '900', textDecoration: 'underline', marginBottom: '10px'}}>
                    <p style={{fontSize: '21px', fontWeight: '900', textDecoration: 'underline'}}>Mealize</p>
                    <li style={{listStyle: 'none', fontSize: '14px', fontWeight: '700'}}><a style={{color: 'black', cursor: 'pointer'}} href='https://github.com/Luke-Yamasaki/Mealize/wiki' target='_blank' rel="noreferrer noopener">About Mealize</a></li>
                </ul>
            </div>
            <section style={{maxWidth: '1336px', width: '100vw', height: '100px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                <div style={{width: '750px', height: '40px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: '10px', alignItems: 'center', paddingLeft: '50px'}}>
                    <p style={{fontSize: '14px', fontWeight: '900'}}>Mealize was designed and developed by Luke Yamasaki</p>
                    <li style={{listStyle: 'none', fontSize: '14px', fontWeight: '700', textDecoration: 'none'}}>
                        <div>
                            <a style={{color: 'black', cursor: 'pointer'}} href='https://github.com/Luke-Yamasaki' target='_blank' rel="noreferrer noopener">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22.813" height="22.243" viewBox="0 0 22.813 22.243">
                                    <path id="Icon_awesome-github" dataname="Icon awesome-github" d="M7.63,18.472c0,.092-.106.166-.239.166-.152.014-.258-.06-.258-.166s.106-.166.239-.166S7.63,18.367,7.63,18.472ZM6.2,18.265c-.032.092.06.2.2.225a.216.216,0,0,0,.285-.092c.028-.092-.06-.2-.2-.239A.236.236,0,0,0,6.2,18.265Zm2.033-.078c-.133.032-.225.12-.212.225s.133.152.271.12.225-.12.212-.212S8.366,18.174,8.233,18.187ZM11.259.563A11.029,11.029,0,0,0,0,11.785a11.531,11.531,0,0,0,7.8,11c.589.106.8-.258.8-.557s-.014-1.858-.014-2.824c0,0-3.22.69-3.9-1.371,0,0-.524-1.338-1.279-1.683,0,0-1.053-.722.074-.708A2.428,2.428,0,0,1,5.252,16.83a2.431,2.431,0,0,0,3.353.961,2.556,2.556,0,0,1,.736-1.55c-2.571-.285-5.165-.658-5.165-5.082A3.486,3.486,0,0,1,5.262,8.45a4.346,4.346,0,0,1,.12-3.123c.961-.3,3.174,1.242,3.174,1.242a10.866,10.866,0,0,1,5.777,0s2.212-1.545,3.174-1.242a4.344,4.344,0,0,1,.12,3.123,3.575,3.575,0,0,1,1.187,2.709c0,4.438-2.709,4.793-5.28,5.082a2.72,2.72,0,0,1,.782,2.134c0,1.55-.014,3.468-.014,3.845,0,.3.212.662.8.557a11.425,11.425,0,0,0,7.718-10.993A11.278,11.278,0,0,0,11.259.563ZM4.471,16.426c-.06.046-.046.152.032.239s.179.106.239.046.046-.152-.032-.239S4.53,16.366,4.471,16.426Zm-.5-.373c-.032.06.014.133.106.179a.137.137,0,0,0,.2-.032c.032-.06-.014-.133-.106-.179C4.08,15.993,4.006,16.007,3.974,16.053Zm1.49,1.637c-.074.06-.046.2.06.285.106.106.239.12.3.046s.032-.2-.06-.285C5.662,17.631,5.524,17.617,5.464,17.691Zm-.524-.676c-.074.046-.074.166,0,.271s.2.152.258.106a.21.21,0,0,0,0-.285C5.133,17,5.013,16.955,4.94,17.014Z" transform="translate(0 -0.563)"/>
                                </svg>
                            </a>
                        </div>
                    </li>
                    <li style={{listStyle: 'none', fontSize: '14px', fontWeight: '700', textDecoration: 'none'}}>
                        <div>
                            <a style={{color: 'black', cursor: 'pointer'}} href='https://www.linkedin.com/in/lukeyamasaki/' target='_blank' rel="noreferrer noopener">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20.605" height="20.605" viewBox="0 0 20.605 20.605">
                                    <path id="Icon_awesome-linkedin" dataname="Icon awesome-linkedin" d="M19.133,2.25H1.467A1.478,1.478,0,0,0,0,3.736V21.37a1.478,1.478,0,0,0,1.467,1.486H19.133a1.482,1.482,0,0,0,1.472-1.486V3.736A1.482,1.482,0,0,0,19.133,2.25ZM6.228,19.912H3.174V10.078H6.232v9.833ZM4.7,8.735A1.771,1.771,0,1,1,6.471,6.964,1.772,1.772,0,0,1,4.7,8.735ZM17.675,19.912H14.621V15.128c0-1.141-.023-2.608-1.587-2.608-1.591,0-1.835,1.242-1.835,2.525v4.866H8.145V10.078h2.93v1.343h.041A3.217,3.217,0,0,1,14.01,9.834c3.091,0,3.666,2.038,3.666,4.687Z" transform="translate(0 -2.25)"/>
                                </svg>
                            </a>
                        </div>
                    </li>
                    <li style={{listStyle: 'none', fontSize: '14px', fontWeight: '700', textDecoration: 'none'}}>
                        <div>
                            <a style={{color: 'black', cursor: 'pointer'}} href='https://www.behance.net/lukeyamasac140' target='_blank' rel="noreferrer noopener">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20.605" height="20.605" viewBox="0 0 20.605 20.605">
                                    <path id="Icon_awesome-behance-square" dataname="Icon awesome-behance-square" d="M8.578,14.254c0,.888-.644,1.168-1.435,1.168H5.069V12.99H7.184C8.04,12.994,8.578,13.348,8.578,14.254Zm-.354-3.785c0-.814-.63-1.007-1.329-1.007H5.073v2.061H7.037C7.732,11.522,8.224,11.219,8.224,10.469Zm6.085,1.067A1.371,1.371,0,0,0,12.851,12.9h2.861A1.311,1.311,0,0,0,14.309,11.536Zm6.3-7.078v16.19A2.208,2.208,0,0,1,18.4,22.855H2.208A2.208,2.208,0,0,1,0,20.647V4.458A2.208,2.208,0,0,1,2.208,2.25H18.4A2.208,2.208,0,0,1,20.605,4.458ZM12.5,9.287h3.578V8.418H12.5ZM10.519,14.36a2.287,2.287,0,0,0-1.61-2.373,1.717,1.717,0,0,0,1.205-1.7C10.114,8.528,8.8,8.1,7.29,8.1H3.128v8.831H7.41C9.015,16.922,10.519,16.154,10.519,14.36Zm6.959-.681c0-1.89-1.108-3.468-3.109-3.468A3.21,3.21,0,0,0,11.1,13.6a3.116,3.116,0,0,0,3.27,3.358A2.852,2.852,0,0,0,17.363,14.8h-1.55a1.455,1.455,0,0,1-1.389.832,1.443,1.443,0,0,1-1.568-1.624h4.609C17.468,13.9,17.478,13.79,17.478,13.679Z" transform="translate(0 -2.25)"/>
                                </svg>
                            </a>
                        </div>
                    </li>
                </div>
                <div style={{width: '800px', height: '40px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '10px'}}>
                    <p style={{fontSize: '14px', fontWeight: '900' }}>Huge thanks to App Academy and the Rocky Mountain College of Art + Design</p>
                    <li style={{listStyle: 'none', fontSize: '14px', fontWeight: '700', textDecoration: 'none'}}>
                        <div>
                            <a style={{color: 'black', cursor: 'pointer'}} href='https://www.appacademy.io/' target='_blank' rel="noreferrer noopener">
                                <img style={{filter: 'grayscale(100%)', width: '30px', height: '30px', borderRadius: '100%'}} src='https://pbs.twimg.com/profile_images/378800000699275845/28983bbc0ac0a12cde1c0dc3fc818b4b.png' alt='App academy' />
                            </a>
                        </div>
                    </li>
                    <li style={{listStyle: 'none', fontSize: '14px', fontWeight: '700', textDecoration: 'none'}}>
                        <div>
                            <a style={{color: 'black', cursor: 'pointer'}} href='https://www.rmcad.edu/' target='_blank' rel="noreferrer noopener">
                                <img style={{filter: 'grayscale(100%)', width: '30px', height: '30px', borderRadius: '100%'}} src='https://pbs.twimg.com/profile_images/928309188970782720/lnLDcr-J_400x400.jpg' alt='Rocky Mountain College of Art and Design' />
                            </a>
                        </div>
                    </li>
                </div>
            </section>
        </div>
    )
}
