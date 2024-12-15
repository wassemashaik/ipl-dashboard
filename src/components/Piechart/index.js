import {PieChart, Pie, Cell, Legend, Tooltip} from 'recharts'

const COLORS = ['#a4261d', '#f7db00', '#da237b']

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const getMatchStatics = recentMatches => {
  let won = 0
  let lost = 0
  let drawn = 0

  recentMatches.forEach(match => {
    const result = match.matchStatus.toLowerCase()
    console.log('result: ', result)

    if (result === 'won') {
      won += 1
    } else if (result === 'lost') {
      lost += 1
    } else {
      drawn += 1
    }
  })
  return {won, lost, drawn}
}

export default function Piechart({recentMatches}) {
  const {won, lost, drawn} = getMatchStatics(recentMatches)

  const data = [
    {name: 'Won', value: won},
    {name: 'Lost', value: lost},
    {name: 'Drawn', value: drawn},
  ]

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map(entry => (
          <Cell
            key={`cell-${entry.id}`}
            fill={COLORS[entry.id % COLORS.length]}
          />
        ))}
        <Tooltip />
        <Legend />
      </Pie>
    </PieChart>
  )
}
