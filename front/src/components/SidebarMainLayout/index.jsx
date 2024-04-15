const SidebarMainLayout = ({ sidebar, main }) => (
	<div className="sidebarMain">
		<div className="side">{sidebar} </div>
		<div className="main">{main} </div>
	</div>
);
export default SidebarMainLayout;