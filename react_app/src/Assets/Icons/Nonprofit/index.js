export const Nonprofit = ({ color }) => {
    if(color === 'black' || color === 'white') {
        return (
            <svg id="Black_hand" dataname="Black hand" xmlns="http://www.w3.org/2000/svg" width="29.95" height="25.781" viewBox="0 0 29.95 25.781">
                <path id="Path_9569" dataname="Path 9569" d="M27.423,7.372l-.738.739-5.46,5.458a.892.892,0,0,1-1.261,0l-6.2-6.2a4.3,4.3,0,0,1,0-6.087l0,0A4.3,4.3,0,0,1,19.214.753a.889.889,0,0,1,.388.654v.009a.892.892,0,0,1-.3.753l-.819.724a3.353,3.353,0,0,0-1.1,2.921l.388,3.23a.565.565,0,0,0,.558.5h.058a.591.591,0,0,0,.581-.6h0V8.928L18.736,5.74a.621.621,0,0,1,.582-.657h.04a.6.6,0,0,1,.424.177.647.647,0,0,1,.194.423l.039,3.307a.579.579,0,0,0,.58.558.592.592,0,0,0,.581-.558l.079-3.307a.62.62,0,0,1,.62-.6.632.632,0,0,1,.619.645V5.74l-.233,3.189a.58.58,0,0,0,.539.617h.042a.573.573,0,0,0,.381-.142.52.52,0,0,0,.179-.361l.406-3.23a3.333,3.333,0,0,0-1.1-2.92l-.822-.722a.889.889,0,0,1-.3-.752V1.408A.893.893,0,0,1,21.977.75a4.3,4.3,0,0,1,5.447,6.621Z" fill={ color === 'black' ? "black" : "white" } />
                <path id="Path_9570" dataname="Path 9570" d="M29.39,16.221a1.72,1.72,0,0,0-2.214,0l-4.808,3.841a3.312,3.312,0,0,1-2.08.728H14.141a.832.832,0,0,1,0-1.664h4.071a1.73,1.73,0,0,0,1.731-1.383,1.665,1.665,0,0,0-1.362-1.921,1.637,1.637,0,0,0-.28-.024H9.982A6.124,6.124,0,0,0,6.13,17.165L3.712,19.126H.831A.835.835,0,0,0,0,19.959v4.99a.834.834,0,0,0,.831.832H19.385a3.34,3.34,0,0,0,2.081-.728l7.861-6.291a1.663,1.663,0,0,0,.258-2.337,1.643,1.643,0,0,0-.195-.2Z" fill={ color === "black" ? '#191919' : 'white'} />
            </svg>
        )
    } else {
        return (
            <svg id="Gradient_nonprofit" dataname="Gradient nonprofit" xmlns="http://www.w3.org/2000/svg" width="29.95" height="25.781" viewBox="0 0 29.95 25.781">
                <defs>
                    <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                        <stop offset="0" stopColor="#76d97e"/>
                        <stop offset="1" stopColor="#28a690"/>
                    </linearGradient>
                </defs>
                <path id="Path_9569" dataname="Path 9569" d="M27.423,7.372l-.738.739-5.46,5.458a.892.892,0,0,1-1.261,0l-6.2-6.2a4.3,4.3,0,0,1,0-6.087l0,0A4.3,4.3,0,0,1,19.214.753a.889.889,0,0,1,.388.654v.009a.892.892,0,0,1-.3.753l-.819.724a3.353,3.353,0,0,0-1.1,2.921l.388,3.23a.565.565,0,0,0,.558.5h.058a.591.591,0,0,0,.581-.6h0V8.928L18.736,5.74a.621.621,0,0,1,.582-.657h.04a.6.6,0,0,1,.424.177.647.647,0,0,1,.194.423l.039,3.307a.579.579,0,0,0,.58.558.592.592,0,0,0,.581-.558l.079-3.307a.62.62,0,0,1,.62-.6.632.632,0,0,1,.619.645V5.74l-.233,3.189a.58.58,0,0,0,.539.617h.042a.573.573,0,0,0,.381-.142.52.52,0,0,0,.179-.361l.406-3.23a3.333,3.333,0,0,0-1.1-2.92l-.822-.722a.889.889,0,0,1-.3-.752V1.408A.893.893,0,0,1,21.977.75a4.3,4.3,0,0,1,5.447,6.621Z" fill="url(#linear-gradient)"/>
                <path id="Path_9570" dataname="Path 9570" d="M29.39,16.221a1.72,1.72,0,0,0-2.214,0l-4.808,3.841a3.312,3.312,0,0,1-2.08.728H14.141a.832.832,0,0,1,0-1.664h4.071a1.73,1.73,0,0,0,1.731-1.383,1.665,1.665,0,0,0-1.362-1.921,1.637,1.637,0,0,0-.28-.024H9.982A6.124,6.124,0,0,0,6.13,17.165L3.712,19.126H.831A.835.835,0,0,0,0,19.959v4.99a.834.834,0,0,0,.831.832H19.385a3.34,3.34,0,0,0,2.081-.728l7.861-6.291a1.663,1.663,0,0,0,.258-2.337,1.643,1.643,0,0,0-.195-.2Z" fill="url(#linear-gradient)"/>
            </svg>
        )
    };
};
