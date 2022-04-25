
export const Footer = () => {
    return (
        <div style={{width: '1600px', height: '500px', backgroundColor: '#76D97E', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'left', fontFamily: 'motiva-sans, sans-serif'}}>
            <div style={{width: '1590px', height: '300px', display: 'flex', flexDirection: 'row', alignItems: 'top', justifyContent: 'flex-start', gap: '10px', paddingLeft: '10px'}}>
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
                    <li style={{listStyle: 'none', fontSize: '14px', fontWeight: '700'}}><a style={{color: 'black', cursor: 'pointer'}} href='https://github.com/Luke-Yamasaki/Mealize/wiki' target='_blank'>About Mealize</a></li>
                </ul>
            </div>
            <div>
                <p style={{fontSize: '16px', fontWeight: '900'}}>Mealize was designed and developed by Luke Yamasaki</p>
                <li style={{listStyle: 'none', fontSize: '14px', fontWeight: '700', textDecoration: 'none'}}><a style={{color: 'black', cursor: 'pointer'}} href='https://github.com/Luke-Yamasaki' target='_blank'>Github</a></li>
                <li style={{listStyle: 'none', fontSize: '14px', fontWeight: '700', textDecoration: 'none'}}><a style={{color: 'black', cursor: 'pointer'}} href='https://www.linkedin.com/in/lukeyamasaki/' target='_blank'>LinkedIn</a></li>
            </div>
            <div>
                <p style={{fontSize: '16px', fontWeight: '900' }}>Special thanks to App Academy and the Rocky Mountain College of Art + Design</p>
                <li style={{listStyle: 'none', fontSize: '14px', fontWeight: '700', textDecoration: 'none'}}><a style={{color: 'black', cursor: 'pointer'}} href='https://www.appacademy.io/' target='_blank'>App Academy</a></li>
                <li style={{listStyle: 'none', fontSize: '14px', fontWeight: '700', textDecoration: 'none'}}><a style={{color: 'black', cursor: 'pointer'}} href='https://www.rmcad.edu/' target='_blank'>Rocky Mountain College of Art + Design</a></li>
            </div>
        </div>
    )
}
