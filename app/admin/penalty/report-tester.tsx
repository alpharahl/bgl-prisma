'use client'

import {classifyReport} from "@/actions/penalty";

const ReportTester = () => {
  return (
    <div>
      <button onClick={async () => {
        classifyReport("")
      }}>Report</button>
    </div>
  )
}

export default ReportTester