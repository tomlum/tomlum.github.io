document.addEventListener("DOMContentLoaded", function (){
// Utils
d3.selection.prototype.apply = d3.transition.prototype.apply = function () {
    const callback = arguments[0]
    arguments[0] = this
    return callback.apply(null, arguments)
}

function commafy(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const lyricsData = [
  {lyric:"Harry Truman", wikiName: "Harry S. Truman", addendum: " (Harry S. Truman)", count:188572, oldCount: 163452, url: "Harry_S._Truman", type: "person"},
  {lyric:"Doris Day", wikiName: "Doris Day", addendum: "", count:180062, oldCount: 146857, url: "Doris_Day", type: "person"},
  {lyric:"Red China", wikiName: "Communist Party of China", addendum: " (Communist Party of China)", count:78351, oldCount: 60654, url: "Communist_Party_of_China", type: "history"},
  {lyric:"Johnnie Ray", wikiName: "Johnnie Ray", addendum: " (Johnnie Ray)", count:15651, oldCount: 14543, url: "Johnnie_Ray", type: "person"},
  {lyric:"South Pacific", wikiName: "South Pacific (musical)", addendum: " (musical)", count:24372, oldCount: 23686, url: "South_Pacific_(musical)(musical)", type: "art"},
  {lyric:"Walter Winchell", wikiName: "Walter Winchell", addendum: "", count:9309, oldCount: 8038, url: "Walter_Winchell", type: "person"},
  {lyric:"Joe DiMaggio", wikiName: "Joe DiMaggio", addendum: "", count:86712, oldCount: 83330, url: "Joe_DiMaggio", type: "person"},
  {lyric:"Joe McCarthy", wikiName: "Joe McCarthy", addendum: " (Joseph McCarthy)", count:79975, oldCount: 65057, url: "Joseph_McCarthy", type: "person"},
  {lyric:"Richard Nixon", wikiName: "Richard Nixon", addendum: "", count:434072, oldCount: 332371, url: "Richard_Nixon", type: "person"},
  {lyric:"Studebaker", wikiName: "Studebaker", addendum: "", count:27031, oldCount: 29181, url: "Studebaker", type: "history"},
  {lyric:"Television", wikiName: "Television", addendum: "", count:114492, oldCount: 104753, url: "Television", type: "history"},
  {lyric:"North Korea, South Korea", wikiName: "Korean War", addendum: " (Korean War)", count:231086, oldCount: 380753, url: "Korean_War", type: "history"},
  {lyric:"Marilyn Monroe", wikiName: "Marilyn Monroe", addendum: "", count:501088, oldCount: 448649, url: "Marilyn_Monroe", type: "person"},
  {lyric:"Rosenbergs", wikiName: "Ethel and Julius Rosenberg", addendum: " (Ethel and Julius Rosenberg)", count:62786, oldCount: 97269, url: "Julius_and_Ethel_Rosenberg", type: "person"},
  {lyric:"H-Bomb", wikiName: "Thermonuclear Weapon", addendum: " (Thermonuclear Weapon)", count:48001, oldCount: 43537, url: "Thermonuclear_weapon", type: "history"},
  {lyric:"Sugar Ray", wikiName: "Sugar Ray Robinson", addendum: " (Sugar Ray Robinson)", count:56210, oldCount: 38294, url: "Sugar_Ray_Robinson", type: "person"},
  {lyric:"Panmunjom", wikiName: "Korean Armistice Agreement", addendum: " (Korean Armistice Agreement)", count:10226, oldCount: 27663, url: "Korean_Armistice_Agreement", type: "history"},
  {lyric:"Brando", wikiName: "Marlon Brando", addendum: " (Marlon Brando)", count:366801, oldCount: 240932, url: "Marlon_Brando", type: "person"},
  {lyric:"The King and I", wikiName: "The King and I", addendum: "", count:44626, oldCount: 43322, url: "The_King_and_I", type: "art"},
  {lyric:"The Catcher in the Rye", wikiName: "The Catcher in the Rye", addendum: "", count:171571, oldCount: 148608, url: "The_Catcher_in_the_Rye", type: "art"},
  {lyric:"Eisenhower", wikiName: "Dwight D. Eisenhower", addendum: " (Dwight D. Eisenhower)", count:253897, oldCount: 207811, url: "Dwight_D._Eisenhower._Eisenhower", type: "person"},
  {lyric:"Vaccine", wikiName: "Polio Vaccine", addendum: " (Polio Vaccine)", count:46848, oldCount: 42482, url: "Polio_vaccine", type: "history"},
  {lyric:"England's got a new Queen", wikiName: "Elizabeth II", addendum: " (Elizabeth II)", count:1435839, oldCount: 1502400, url: "Elizabeth_II", type: "person"},
  {lyric:"Marciano", wikiName: "Rocky Marciano", addendum: " (Rocky Marciano)", count:77587, oldCount: 57976, url: "Rocky_Marciano", type: "person"},
  {lyric:"Liberace", wikiName: "Liberace", addendum: "", count:102840, oldCount: 103675, url: "Liberace", type: "person"},
  {lyric:"Satayana Goodbye", wikiName: "George Santayana", addendum: " (George Santayana)", count:18343, oldCount: 15400, url: "George_Santayana", type: "person"},
  {lyric:"Joseph Stalin", wikiName: "Joseph Stalin", addendum: "", count:466843, oldCount: 391533, url: "Joseph_Stalin", type: "person"},
  {lyric:"Malenkov", wikiName: "Georgy Malenkov", addendum: " (Georgy Malenkov)", count:72582, oldCount: 55138, url: "Georgy_Malenkov", type: "person"},
  {lyric:"Nasser", wikiName: "Gamal Abdel Nasser", addendum: " (Gamal Abdel Nasser)", count:56092, oldCount: 52268, url: "Gamal_Abdel_Nasser", type: "person"},
  {lyric:"Prokofiev", wikiName: "Sergei Prokofiev", addendum: " (Sergei Prokofiev)", count:29582, oldCount: 30335, url: "Sergei_Prokofiev", type: "person"},
  {lyric:"Rockefeller", wikiName: "Winthrop Rockefeller", addendum: " (Winthrop Rockefeller)", count:8261, oldCount: 5897, url: "Winthrop_Rockefeller", type: "person"},
  {lyric:"Campanella", wikiName: "Roy Campanella", addendum: " (Roy Campanella)", count:12462, oldCount: 10971, url: "Roy_Campanella", type: "person"},
  {lyric:"Communist Bloc", wikiName: "Eastern Bloc", addendum: "", count:46803, oldCount: 45353, url: "Eastern_Bloc", type: "history"},
  {lyric:"Roy Cohn", wikiName: "Roy Cohn", addendum: "", count:89624, oldCount: 92419, url: "Roy_Cohn", type: "person"},
  {lyric:"Juan Peron", wikiName: "Juan Peron", addendum: "", count:47829, oldCount: 51862, url: "Juan_Per%C3%B3n%C3%B3n", type: "person"},
  {lyric:"Toscanini", wikiName: "Arturo Toscanini", addendum: " (Arturo Toscanini)", count:11466, oldCount: 8601, url: "Arturo_Toscanini", type: "person"},
  {lyric:"Dacron", wikiName: "Dacron", addendum: "", count:3649, oldCount: 3070, url: "Dacron", type: "history"},
  {lyric:"Dien Bien Phu Falls", wikiName: "Battle of Dien Bien Phu", addendum: " (Battle of Dien Bien Phu)", count:30851, oldCount: 32717, url: "Battle_of_Dien_Bien_Phu", type: "history"},
  {lyric:"Rock Around the Clock", wikiName: "Rock Around the Clock", addendum: "", count:10480, oldCount: 9698, url: "Rock_Around_the_Clock", type: "art"},
  {lyric:"Einstein", wikiName: "Albert Einstein", addendum: " (Albert Einstein)", count:553216, oldCount: 553928, url: "Albert_Einstein", type: "person"},
  {lyric:"James Dean", wikiName: "James Dean", addendum: "", count:203316, oldCount: 192401, url: "James_Dean", type: "person"},
  {lyric:"Brooklyn's got a winning team", wikiName: "Brooklyn Dodgers", addendum: " (Brooklyn Dodgers)", count:6583, oldCount: 7719, url: "Brooklyn_Dodgers", type: "person"},
  {lyric:"Davy Crockett", wikiName: "Davy Crockett", addendum: "", count:80832, oldCount: 75005, url: "Davy_Crockett", type: "art"},
  {lyric:"Peter Pan", wikiName: "Peter Pan", addendum: "", count:96478, oldCount: 92549, url: "Peter_Pan", type: "art"},
  {lyric:"Elvis Presley", wikiName: "Elvis Presley", addendum: "", count:802167, oldCount: 515112, url: "Elvis_Presley", type: "person"},
  {lyric:"Disneyland", wikiName: "Disneyland", addendum: "", count:99339, oldCount: 92802, url: "Disneyland", type: "art"},
  {lyric:"Bardot", wikiName: "Brigitte Bardot", addendum: " (Brigitte Bardot)", count:81669, oldCount: 77227, url: "Brigitte_Bardot", type: "person"},
  {lyric:"Budapest", wikiName: "Hungarian Revolution of 1956", addendum: " (Hungarian Revolution of 1956)", count:37923, oldCount: 36753, url: "Hungarian_Revolution_of_1956", type: "history"},
  {lyric:"Alabama", wikiName: "Civil rights movement", addendum: " (Civil rights movement)", count:82494, oldCount: 61735, url: "Civil_rights_movement", type: "history"},
  {lyric:"Krushchev", wikiName: "Nikita Khrushchev", addendum: " (Nikita Khrushchev)", count:152873, oldCount: 145299, url: "Nikita_Khrushchev", type: "person"},
  {lyric:"Princess Grace", wikiName: "Grace Kelly", addendum: " (Grace Kelly)", count:179498, oldCount: 226215, url: "Grace_Kelly", type: "person"},
  {lyric:"Peyton Place", wikiName: "Peyton Place (novel)", addendum: "(novel)", count:4200, oldCount: 4460, url: "Peyton_Place_(novel)", type: "art"},
  {lyric:"Trouble in the Suez", wikiName: "Suez Crisis", addendum: " (Suez Crisis)", count:98380, oldCount: 89746, url: "Suez_Crisis", type: "history"},
  {lyric:"Little Rock", wikiName: "Little Rock Nine", addendum: " (Little Rock Nine)", count:40836, oldCount: 28375, url: "Little_Rock_Nine", type: "history"},
  {lyric:"Pasternak", wikiName: "Boris Pasternak", addendum: " (Boris Pasternak)", count:22329, oldCount: 17638, url: "Boris_Pasternak", type: "person"},
  {lyric:"Mickey Mantle", wikiName: "Mickey Mantle", addendum: "", count:52330, oldCount: 93543, url: "Mickey_Mantle", type: "person"},
  {lyric:"Kerouac", wikiName: "Jack Kerouac", addendum: " (Jack Kerouac)", count:72887, oldCount: 62207, url: "Jack_Kerouac", type: "person"},
  {lyric:"Sputnik", wikiName: "Sputnik I", addendum: " (Sputnik I)", count:55566, oldCount: 52602, url: "Sputnik_1", type: "history"},
  {lyric:"Chou En Lai", wikiName: "Zhou Enlai", addendum: " (Zhou Enlai)", count:32585, oldCount: 26480, url: "Zhou_Enlai", type: "person"},
  {lyric:"Bridge on the River Kwai", wikiName: "The Bridge on the River Kwai", addendum: "", count:44642, oldCount: 50741, url: "The_Bridge_on_the_River_Kwai", type: "art"},
  {lyric:"Lebanon", wikiName: "1958 Lebanon Crisis", addendum: " (1958 Lebanon Crisis)", count:7030, oldCount: 6590, url: "1958_Lebanon_crisis", type: "history"},
  {lyric:"Charles de Gaulle", wikiName: "Charles de Gaulle", addendum: "", count:92382, oldCount: 85876, url: "Charles_de_Gaulle", type: "person"},
  {lyric:"California baseball", wikiName: "Los Angeles Dodgers", addendum: " (Los Angeles Dodgers)", count:48178, oldCount: 59598, url: "Los_Angeles_Dodgers", type: "person"},
  {lyric:"Starkweather homicide", wikiName: "Charles Starkweather", addendum: " (Charles Starkweather)", count:32481, oldCount: 21201, url: "Charles_Starkweather", type: "person"},
  {lyric:"Children of Thalidomide", wikiName: "Thalidomide", addendum: " (Thalidomide)", count:74394, oldCount: 75718, url: "Thalidomide", type: "history"},
  {lyric:"Buddy Holly", wikiName: "Buddy Holly", addendum: "", count:138173, oldCount: 117868, url: "Buddy_Holly", type: "person"},
  {lyric:"Ben-Hur", wikiName: "Ben-Hur (1959 Film)", addendum: " (1959 Film)", count:82105, oldCount: 42944, url: "Ben-Hur_(1959_film)-Hur_(1959_film)", type: "art"},
  {lyric:"Space Monkey", wikiName: "Monkeys and apes in space", addendum: " (Monkeys and apes in space)", count:13114, oldCount: 10139, url: "Monkeys_and_apes_in_space", type: "history"},
  {lyric:"Mafia", wikiName: "American Mafia", addendum: " (American Mafia)", count:119648, oldCount: 109258, url: "American_Mafia", type: "history"},
  {lyric:"Hula hoops", wikiName: "Hula hoops", addendum: "", count:10911, oldCount: 10074, url: "Hula_hoop", type: "history"},
  {lyric:"Castro", wikiName: "Fidel Castro", addendum: " (Fidel Castro)", count:181502, oldCount: 132532, url: "Fidel_Castro", type: "person"},
  {lyric:"Edsel is a no-go", wikiName: "Edsel", addendum: " (Edsel)", count:19815, oldCount: 19118, url: "Edsel", type: "history"},
  {lyric:"U-2", wikiName: "1960 U-2 Incident", addendum: " (1960 U-2 Incident)", count:21584, oldCount: 19561, url: "1960_U-2_incident-2_incident", type: "history"},
  {lyric:"Syngman Rhee", wikiName: "Syngman Rhee", addendum: "", count:18650, oldCount: 19756, url: "Syngman_Rhee", type: "person"},
  {lyric:"Payola", wikiName: "Payola", addendum: "", count:14849, oldCount: 12631, url: "Payola", type: "history"},
  {lyric:"Kennedy", wikiName: "John F. Kennedy", addendum: " (John F. Kennedy)", count:566399, oldCount: 450499, url: "John_F._Kennedy._Kennedy", type: "person"},
  {lyric:"Chubby Checker", wikiName: "Chubby Checker", addendum: " (Chubby Checker)", count:29487, oldCount: 26235, url: "Chubby_Checker", type: "person"},
  {lyric:"Psycho", wikiName: "Psycho (1960 film)", addendum: " (1960 film)", count:85857, oldCount: 97732, url: "Psycho_(1960_film)(1960_film)", type: "art"},
  {lyric:"Belgians in the Congo", wikiName: "Congo Crisis", addendum: " (Congo Crisis)", count:31804, oldCount: 24429, url: "Congo_Crisis", type: "history"},
  {lyric:"Hemingway", wikiName: "Ernest Hemingway", addendum: " (Ernest Hemingway)", count:296433, oldCount: 269474, url: "Ernest_Hemingway", type: "person"},
  {lyric:"Eichmann", wikiName: "Adolf Eichmann", addendum: " (Adolf Eichmann)", count:229728, oldCount: 229597, url: "Adolf_Eichmann", type: "person"},
  {lyric:"Stranger in a Strange Land", wikiName: "Stranger in a Strange Land", addendum: "", count:23145, oldCount: 24073, url: "Stranger_in_a_Strange_Land", type: "art"},
  {lyric:"Dylan", wikiName: "Bob Dylan", addendum: " (Bob Dylan)", count:306029, oldCount: 244956, url: "Bob_Dylan", type: "person"},
  {lyric:"Berlin", wikiName: "Berlin Wall", addendum: " (Berlin Wall)", count:252693, oldCount: 190212, url: "Berlin_Wall", type: "history"},
  {lyric:"Bay of Pigs Invasion", wikiName: "Bay of Pigs Invasion", addendum: "", count:93646, oldCount: 74306, url: "Bay_of_Pigs_Invasion", type: "history"},
  {lyric:"Lawrence of Arabia", wikiName: "Lawrence of Arabia", addendum: "", count:98041, oldCount: 60932, url: "Lawrence_of_Arabia_(film)(film)", type: "art"},
  {lyric:"British Beatlemania", wikiName: "The Beatles", addendum: " (The Beatles)", count:434683, oldCount: 483972, url: "The_Beatles", type: "person"},
  {lyric:"Ole Miss", wikiName: "Ole Miss riot of 1962", addendum: " (Ole Miss riot of 1962)", count:4839, oldCount: 3463, url: "Ole_Miss_riot_of_1962", type: "history"},
  {lyric:"John Glenn", wikiName: "John Glenn", addendum: "", count:78537, oldCount: 60141, url: "John_Glenn", type: "history"},
  {lyric:"Liston beats Patterson", wikiName: "Sonny Liston", addendum: " (Sonny Liston)", count:48499, oldCount: 29047, url: "Sonny_Liston", type: "person"},
  {lyric:"Pope Paul", wikiName: "Pope Paul VI", addendum: " (Pope Paul VI)", count:28846, oldCount: 28303, url: "Pope_Paul_VI", type: "person"},
  {lyric:"Malcom X", wikiName: "Malcom X", addendum: "", count:298567, oldCount: 236431, url: "Malcolm_X", type: "person"},
  {lyric:"British politican sex", wikiName: "Profumo affair", addendum: " (Profumo affair)", count:38684, oldCount: 44359, url: "Profumo_affair", type: "history"},
  {lyric:"JFK blown away", wikiName: "Assassination of John F. Kennedy", addendum: " (Assassination of John F. Kennedy)", count:155467, oldCount: 135381, url: "y", type: "history"},
  {lyric:"Birth control", wikiName: "Oral contraceptive pill", addendum: " (Oral contraceptive pill)", count:5734, oldCount: 5402, url: "Oral_contraceptive_pill", type: "history"},
  {lyric:"Ho Chi Minh", wikiName: "Ho Chi Minh", addendum: "", count:87123, oldCount: 108216, url: "Ho_Chi_Minh", type: "person"},
  {lyric:"Richard Nixon back again", wikiName: "Richard Nixon", addendum: "", count:434072, oldCount: 332371, url: "Richard_Nixon", type: "person"},
  {lyric:"Moonshot", wikiName: "Apollo 11", addendum: " (Apollo 11)", count:281735, oldCount: 131717, url: "Apollo_11", type: "history"},
  {lyric:"Woodstock", wikiName: "Woodstock", addendum: "", count:252836, oldCount: 104405, url: "Woodstock", type: "art"},
  {lyric:"Watergate", wikiName: "Watergate scandal", addendum: " (Watergate scandal)", count:379273, oldCount: 273397, url: "Watergate_scandal", type: "history"},
  {lyric:"Punk Rock", wikiName: "Punk Rock", addendum: "", count:67237, oldCount: 62027, url: "Punk_rock", type: "art"},
  {lyric:"Begin", wikiName: "Menachem Begin", addendum: " (Menachem Begin)", count:20913, oldCount: 20629, url: "Menachem_Begin", type: "person"},
  {lyric:"Reagan", wikiName: "Ronald Reagan", addendum: " (Ronald Reagan)", count:428730, oldCount: 342044, url: "Ronald_Reagan", type: "person"},
  {lyric:"Palestine", wikiName: "Israeli-Palestinian conflict", addendum: " (Israeli-Palestinian conflict)", count:80738, oldCount: 85175, url: "flict", type: "history"},
  {lyric:"Terror on the air line", wikiName: "Operation Entebbe", addendum: " (Operation Entebbe)", count:57339, oldCount: 94174, url: "Operation_Entebbe", type: "history"},
  {lyric:"Ayatollah's in Iran", wikiName: "Iranian Revolution", addendum: " (Iranian Revolution)", count:77193, oldCount: 62095, url: "Iranian_Revolution", type: "history"},
  {lyric:"Russians in Afghanistan", wikiName: "Soviet-Afghan War", addendum: " (Soviet-Afghan War)", count:1129, oldCount: 1244, url: "Soviet-Afghan_War", type: "history"},
  {lyric:"Wheel of Fortune", wikiName: "Wheel of Fortune (U.S. game show)", addendum: "  (U.S. game show)", count:90659, oldCount: 57802, url: "w))", type: "art"},
  {lyric:"Sally Ride", wikiName: "Sally Ride", addendum: "", count:46992, oldCount: 56690, url: "Sally_Ride", type: "person"},
  {lyric:"Heavy metal suicide", wikiName: "Heavy metal music", addendum: " (Heavy metal music)", count:75222, oldCount: 75334, url: "Heavy_metal_music", type: "art"},
  {lyric:"Foreign debts", wikiName: "Foreign debts", addendum: " (United States balance of trade)", count:545, oldCount: 522, url: "United_States_balance_of_trade", type: "history"},
  {lyric:"Homeless vets", wikiName: "Vietnam veteran", addendum: " (Vietnam veteran)", count:13470, oldCount: 6335, url: "Vietnam_veteran", type: "history"},
  {lyric:"AIDS", wikiName: "AIDS", addendum: "", count:62890, oldCount: 36868, url: "AIDS", type: "history"},
  {lyric:"Crack", wikiName: "Crack cocaine", addendum: " (Crack cocaine)", count:82538, oldCount: 70295, url: "Crack_cocaine", type: "history"},
  {lyric:"Bernie Goetz", wikiName: "1984 New York City Subway shooting", addendum: "(1984 New York City Subway shooting)", count:23081, oldCount: 13312, url: "1984_New_York_City_Subway_shooting", type: "person"},
  {lyric:"Hypodermics on the shore", wikiName: "Syringe Tide", addendum: " (Syringe Tide)", count:551, oldCount: 558, url: "Syringe_tide", type: "history"},
  {lyric:"China's under martial law", wikiName: "1989 Tiananmen Square protests", addendum: " (1989 Tiananmen Square protests)", count:116899, oldCount: 666, url: "1989_Tiananmen_Square_protests", type: "history"},
  {lyric:"Rock-and-roller cola wars", wikiName: "Cola Wars", addendum: " (Cola Wars)", count:7921, oldCount: 6842, url: "Cola_wars", type: "history"}
]

lyricsData.reverse()

const filters = {
  person: "person",
  history: "history",
  art: "art",
}
let showOld = false
let showNew = true
const oldColorMap = {
  person: "#35597d",
  history: "#826828",
  art: "#852d31",
  science: "#007b43"
}
const colorMap = {
  person: "#66acf0",
  history: "#fac84e",
  art: "#ff575e",
  science: "#00ec82"
}

let chartData = []
let chartMax = 0
let height = 0
function updateData(){

  // ------ FILTERS -------
  chartData = [...lyricsData].filter(a => Object.keys(filters).includes(a.type))

  switch(sortBy){
    case 0:
      break
    case 1:
      chartData = chartData.sort((a,b) => ((a.count > b.count) ? 1 : -1))
      break
    case 2:
      chartData = chartData.sort((a,b) => ((a.count < b.count) ? 1 : -1))
      break
    case 3:
      chartData = chartData.sort((a,b) => ((a.oldCount > b.oldCount) ? 1 : -1))
      break
    case 4:
      chartData = chartData.sort((a,b) => ((a.oldCount < b.oldCount) ? 1 : -1))
      break
    case 5:
      chartData = chartData.sort((a,b) => (((a.count - a.oldCount) > (b.count - b.oldCount)) ? 1 : -1))
      break
    case 6:
      chartData = chartData.sort((a,b) => (((a.count - a.oldCount) < (b.count - b.oldCount)) ? 1 : -1))
      break
  }

  // ------ Height Adjustment ------ 

  height = 20*chartData.length

  chartFrame.apply(transit).attr("height", height+margin.bottom+margin.top)

  // ------ Axes Adjustments ------ 

  chartMax = d3.max(chartData, d => Math.max(d.count, d.oldCount))
  const xScale = d3.scaleLinear()
    .range([0, width])
    .domain([0, chartMax])

  xAxis
    .attr("class", "x axis")
    .call(d3.axisTop(xScale).tickSizeOuter(0))

  const yScale = d3.scaleBand()
      .range([height, 0])
      .domain(chartData.map(d => d.lyric))
      .padding(0.2)
  d3.select('.axis .tick:first-child').remove()

  // ------ Bars ------ 
  let barGroups = chart.selectAll(".bar-group").data(chartData, (d) => d.lyric)

  barGroups.exit()
        .transition()
        .duration(100)
        .style("opacity", 0)
        .remove()

  // Enter/Merge
  const newBarGroups = barGroups
    .enter()
    .append("g")
    .attrs({
      class: "bar-group"
    })
    .on("click", (d) => window.open(`https://www.wikipedia.org/wiki/${d.url}`))
  newBarGroups
    .style("opacity", 0)

  newBarGroups.append("rect")
    // .apply(transit)
    .attrs({
      class: "old-bar",
      height: 0
    })
    .styles({fill: d => oldColorMap[d.type]})
  newBarGroups.append("rect")
    // .apply(transit)
    .attrs({
      class: "bar",
      height: yScale.bandwidth()
    })
    .styles({fill: d => colorMap[d.type]})
  newBarGroups.append("rect")
    .attrs({
      class: "hidden-bar",
      fill: "orange",
      height: yScale.bandwidth()*(1/(1-0.2)),
      y: -2
    })
    .on("mousemove", d => {
        tooltip
          .styles({
            left: d3.event.pageX - 50 + "px",
            top: d3.event.pageY + 10 + "px",
            display: "inline-block"
          })
          .html(`${d.lyric} <i>${d.addendum}</i><br><b>${commafy(d.count)}</b>`)
    })
    .on("mouseout", function(d){ tooltip.style("display", "none")})
  newBarGroups.append("text").attrs({
    class: "bar-text",
    x: -8,
    y: 12,
    "text-anchor": "end"
  })
  newBarGroups.append("rect").attrs({
      class: "bar-tick",
      x: -6,
      y: 7,
      width: 4,
      height: 1,
      fill: "gray"
    })

  barGroups = newBarGroups.merge(barGroups)

  // Update
  barGroups
  .apply(fadeTransit)
    .style("opacity", 1)
    .attrs({
      transform: d => `translate(${0},${yScale(d.lyric)})`
    })

  if(showOld && showNew){
    chart.apply(transit).selectAll(".old-bar").attrs({
      height: yScale.bandwidth()/2
    })
    chart.apply(transit).selectAll(".bar").attrs({
      y: yScale.bandwidth()/2,
      height: yScale.bandwidth()/2
    })
  } else if (showOld) {
    chart.apply(transit).selectAll(".old-bar").attrs({
      y: 0,
      height: yScale.bandwidth()
    })
    chart.apply(transit).selectAll(".bar").attrs({
      height: 0
    }) 
  } else if (showNew){
    chart.apply(transit).selectAll(".bar").attrs({
      y: 0,
      height: yScale.bandwidth()
    })
    chart.apply(transit).selectAll(".old-bar").attrs({
      height: 0
    }) 
  } else{
    chart.apply(transit).selectAll(".bar").attrs({
      height: 0,
    })
    chart.apply(transit).selectAll(".old-bar").attrs({
      height: 0
    }) 
  }

  // Text
  switch(lyricType){
    case 0:
      chart.selectAll(".bar-text")
        .text(d => d.lyric)
      break
    case 1:
      chart.selectAll(".bar-text")
        .text(d => d.wikiName)
      break
  }

  redraw()
}

const margin = {top: 80, right: 17, bottom: 30, left: 185}
let width = 200
// CHART
const chartDiv = document.getElementById("chart")
const chartFrame = d3.select(chartDiv)
const chart = chartFrame
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)
// LEGEND
const legendDiv = document.getElementById("legend-chart")
const legendFrame = d3.select(legendDiv).append("g")

const tooltip = d3.select("body").append("div").attr("class", "toolTip")

let lyricType = 0
d3.select('#selectLyricType').on("change", function () {
  lyricType = this.selectedIndex
  updateData()
})
let sortBy = 0
d3.select('#selectSort').on("change", function () {
  sortBy = this.selectedIndex
  updateData()
})

const xAxis = chart.append("g")

const xAxisLabel = chart.append("text")
    .attr("y", -50)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Wikipedia Page Views in One Month")
    
chart.append("image").attrs({
  id: "billy",
  "xlink:href": "https://tomlum.s3.us-east-2.amazonaws.com/billy.png",
  width: 90,
  height: 80,
  y: -75,
  x: -92
})

function makeCheckBox(text, func, color, x, y, initial = true){
  const legend = legendFrame.append("g").attr("class", "legend-text")

  legend.attrs({
      transform: `translate(${x},${y})`,
      style: "cursor: pointer"
    })
    .append("rect").attrs({
      y: -15/2,
      width: 15,
      height: 15,
      fill: color
    })

  legend.append("text")
  .attrs({
    class: "check-text",
    x: 20,
    y: 1,
    "dominant-baseline": "middle",
    style: "text-anchor: left",
  })
  .text(text)

  const check = legend.append("polyline")
  .attrs({
    points: [
      2,-2,
      6,4,
      13,-5,
    ],
    stroke: "black",
    fill: "none",
    display: !initial? "none" : "default"
  }).attr("stroke-width", 2)
  legend.on("click", () =>{
    let result = func()
    if(result){
      check.attr("display", "default")
    } else {
      check.attr("display", "none")
    }
    updateData()
  })
  return legend
}

function filterFunc(type){
  return () => {
    if(filters[type]){
      delete filters[type]
      return false
    }
    else{
      filters[type] = type
      return true
    }
  }
}

makeCheckBox("Person", filterFunc(filters.person), colorMap["person"], 0, 10)
makeCheckBox("History", filterFunc(filters.history), colorMap["history"], 100, 10)
makeCheckBox("Art", filterFunc(filters.art), colorMap["art"], 200, 10)
makeCheckBox("Jan 2019", () => {
  if(showNew){
    showNew = false
    return false
  } else {
    showNew = true
    return true
  }
}, "#cacaca", 0, 40, true)
makeCheckBox("6 Months Prior", () => {
  if(showOld){
    showOld = false
    return false
  } else {
    showOld = true
    return true
  }
}, "#888", 100, 40, false)

function redraw(){
  width = (chartDiv.clientWidth || chartDiv.parentNode.clientWidth) - margin.left - margin.right
  chart.attr("width", width)

  xScale = d3.scaleLinear()
          .range([0, width])
          .domain([0, d3.max(lyricsData, d => Math.max(d.count, d.oldCount))])

  chart.selectAll(".bar")
    .attr("width", d => xScale(d.count))
  chart.selectAll(".old-bar")
    .attr("width", d => xScale(d.oldCount))
  chart.selectAll(".hidden-bar")
    .attr("width", d => width)


  xAxis
    .call(d3.axisTop(xScale)
    .ticks(Math.max(width/70, 5))
    .tickSize(height)
    .tickFormat(d3.formatPrefix("1.0", 1e4))
  ).attr("transform", "translate(0," + height + ")")

  xAxisLabel.attr("x",0 + (width / 2))
  d3.select('.tick').remove()
}
window.addEventListener("resize", redraw)

function transit(x){
  return x.transition()
      .ease(d3.easeQuadInOut)
      .duration(500)
}

function fadeTransit(x){
  return x.transition()
      .duration(300)
}

updateData()
document.getElementById("loading").remove()
})