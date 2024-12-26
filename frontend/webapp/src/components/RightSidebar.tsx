import React from 'react'

interface RightSidebarProps {
  routeLoads: { [key: string]: number }
}

const RightSidebar: React.FC<RightSidebarProps> = ({ routeLoads }) => {
  return (
    <aside className="App-right-sidebar">
      <h2>Route Loads</h2>
      <ul>
        {Object.entries(routeLoads).map(([routeName, load]) => (
          <li key={routeName}>
            {routeName}: {load}
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default RightSidebar
