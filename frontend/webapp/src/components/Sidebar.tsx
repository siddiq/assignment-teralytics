import React from 'react'
import { ManageableRoute } from '../types'
import './Sidebar.css'

interface SidebarProps {
  routes: ManageableRoute[]
  toggleRouteVisibility: (name: string) => void
  toggleAllRoutes: () => void
  allVisible: boolean
}

const Sidebar: React.FC<SidebarProps> = ({
  routes,
  toggleRouteVisibility,
  toggleAllRoutes,
  allVisible
}) => {
  return (
    <div className="sidebar">
      <div className="route-item">
        <label className="route-label">
          <input
            type="checkbox"
            className="route-checkbox"
            onChange={toggleAllRoutes}
            checked={allVisible}
          />
          {allVisible ? 'Hide All Routes' : 'Show All Routes'}
        </label>
      </div>
      {routes.map((route) => (
        <div key={route.route_short_name} className="route-item">
          <label className="route-label">
            <input
              type="checkbox"
              className="route-checkbox"
              onChange={() => toggleRouteVisibility(route.route_short_name)}
              checked={route.visible}
            />
            {route.route_short_name}
          </label>
        </div>
      ))}
    </div>
  )
}

export default Sidebar
