const ThreeColumnLayout = ({ left, middle, right }) => (
	<div className="threeColumn">
		<div className="left">{left} </div>
		<div className="middle">{middle} </div>
		<div className="right">{right} </div>
	</div>
);
export default ThreeColumnLayout;