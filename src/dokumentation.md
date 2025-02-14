# Dokumentation for "Landrup Dans"

*Nikolaj Petersen, WU11*

![3 sider fra projektet](/public/images/documentation-showcase.png)

## Tech-stack
* [**NextJs:**](https://nextjs.org)

Jeg vælger Next.js, fordi det er det framework, jeg har mest erfaring med, og som jeg arbejder bedst med. Det er meget populært i industrien, hvilket betyder, at der er en stor sandsynlighed for, at jeg vil støde på det i et fremtidigt job. Next.js har en stor community, hvilket gør det nemt at finde løsninger på fejl, da mange har arbejdet med de samme problemer før.Frameworket understøtter både frontend og backend, og dets smarte funktioner, såsom folder-strukturering (f.eks. ``middleware`` og dynamiske routes med ``[]``), gør det hurtigere og mere effektivt at bruge. Håndtering af client- og server-funktionalitet er også gjort utrolig let, hvilket gør Next.js til en fleksibel løsning.

Jeg kunne have valgt Vue.js, men Next.js har en større community, stærkere support for full-stack udvikling, og en mere intuitiv måde at håndtere server-side rendering *(SSR)* og statisk generering *(SSG)*. Vue.js har sine fordele, men Next.js giver en mere strømlinet oplevelse, især for større applikationer. 

* [**TailwindCSS:**](https://tailwindcss.com)

Jeg bruger Tailwind CSS, fordi det er hurtigt og effektivt at style med. Alle stilarter er allerede defineret, så jeg undgår at skrive lange CSS-filer og kan i stedet bruge utility classes direkte i HTML/JSX.

Theming er også let at håndtere, f.eks. til at gemme farver som variabler, hvor Tailwind’s theme-konfiguration gør det nemt at ændre udseendet af en applikation uden besværlig manuel styling.

Alternativet ville være standard **CSS**, som jeg brugte til fonts kun. Tailwind er bedre for mig på grund af det som er sagt ovenover.

* [**React-Icons:**](https://react-icons.github.io/react-icons)

Jeg vælger React-Icons, da det giver adgang til et stort bibliotek af ikoner, som kan bruges med forskellige designstilarter. Det har indbyggede egenskaber som ``color`` og ``size``, hvilket gør styling nemmere og mere fleksibel sammenlignet med traditionelle SVG- eller billedbaserede ikoner.

* [**Zod:**](https://zod.dev)

Zod er mit foretrukne værktøj til validering af formularer. Det er en sikker og effektiv måde at håndtere input på, f.eks. ved login-systemer. Fordelen ved Zod er, at det allerede er kompileret og klar til brug, så jeg slipper for at skrive lange regular expressions eller manuel valideringslogik.

Alternativt kunne jeg have haft brugt [Yup](https://github.com/jquense/yup), men jeg kender allerede til Zod og har haft brugt det i tidligere opgaver.

## Kode-eksempel
Jeg har valgt et eksempel fra [min kalender page](/src/app/(main)/kalender/page.jsx) som har logiken til at vise de aktiviteter du er medlem af / instructør for.

```jsx
export default async function Calendar() {
    const cookieStore = await cookies()
    const token = cookieStore.get("landrupdans_token")
    const uid = cookieStore.get("landrupdans_uid")

    try {
        const response = await fetch(`http://localhost:4000/api/v1/users/${uid.value}`, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token.value
            }
        })

        if (!response.ok) {
            throw new Error("failed to fetch user data")
        }

        const userData = await response.json()
        const role = userData?.role || "default"
        let headerTitle = "Kalender"
        let activities = []

        if (role === "instructor") {
            const instructorActivities = await fetchServer("http://localhost:4000/api/v1/activities")

            headerTitle = "Hold-Oversigt"

            if (!instructorActivities) throw new Error("Activities fetch failed");

            activities = instructorActivities.filter(activity => activity.instructorId === Number(uid.value))
        } else {
            activities = userData?.activities || []
        }

        return (
            <>
                <Header title={headerTitle}/>
                <ul className="flex flex-col gap-8 justify-center items-center">
                    {activities.length > 0 ? (
                        activities.map((activity) => (
                            <CalendarCard key={activity.id} data={activity} userId={uid.value} />
                        ))
                    ) : (
                        <p>Ingen aktiviteter fundet.</p>
                    )}
                </ul>
            </>
        );
    } catch (error) {
        throw new Error(error)
    }
}
```
Den generelle idé er, at vi først henter brugeren, så vi kan se deres ``role``. Derfra finder vi de aktiviteter, vi skal bruge, og laver en liste med dem.

Først finder vi vores ``landrupdans_token`` og ``landrupdans_uid`` tokens. Vi ved, at vi har dem, da vores ``middleware.js`` ikke lader os komme ind på siden, medmindre vi har disse tokens. Derefter forsøger vi, i en try-catch-blok, at hente vores bruger med de værdier, vores tokens har.

Vi opretter ``let`` variabler til vores aktiviteter og header-titel, da vi vil ændre dem. Vi laver en if-else statement, hvor vi tjekker, hvilken rolle vi har. Hvis vi er instruktører, henter vi alle aktiviteter og finder hver aktivitet, der har et ``instructorId``, som matcher vores ``uid`` (vi bruger ``filter`` i stedet for et nyt if-statement). Hvis vi ikke er instruktører, tager vi blot vores activities-objekt fra vores brugerdata.

Efter vi har fundet de aktiviteter, der skal vises, viser vi dem i et card komponent for hver. Hvis der ikke er nogen aktiviteter, viser vi en besked, der oplyser om dette. Vores header skifter også tekst afhængigt af, hvilken rolle vi har.

## Projekten's fremtid
Hvis projektet skulle fortsætte og blive et fuldt produkt, er der flere ting, der kunne forbedres eller tilføjes. En mulighed for instruktører til selv at oprette eller redigere deres aktiviteter ville være en god idé i stedet for at skulle involvere en programmør til at ændre API'et hver gang.

Derudover mangler der en direkte vej til login og signup-siderne, for eksempel en knap i drawer-menuen samt et *"Har du ikke en konto?"* link. Der er også en stor mangel på styling. Selvom det ikke påvirker funktionaliteten, kunne man stadig style forskellige elementer bedre, så de bliver mere tydelige og visuelt tiltalende for brugeren.

Jeg har lavet at skelet og format til hvordan projektet's struktur skal se ud (Feks med hvordan samme struktur format at brugt til kalender og aktivitet siderne og deres indre ID sider). Komponenter og actions har specifike mapper til de forskellige ting.

## Erfaring
Denne opgave har ikke følt svær for mig personligt. Jeg kom hurtigt i gang og fortsatte i et godt tempo hele vejen igennem. Jeg fik skabt en god oversigt i mit hoved over over hvilke ting jeg skulle lave først, hvilke jeg ville gemme til senere, og hvilke problemer jeg højst sandsynligt ville støde på.

Det, der tog mig længst tid, var logikken bag login funktionen. Jeg forsøgte først at bruge kode fra en repetitionsopgave, men jeg kunne ikke få det til at fungere på samme måde. Problemet var, at jeg forsøgte at oprette en ny bruger (via konsollen) for at logge ind i stedet for at bruge en eksisterende bruger på API'et. Efterfølgende kæmpede jeg lidt med fejlhåndtering, men derefter blev resten ret nemt at implementere. Jeg fik hurtigt lavet en "Husk mig" knap og en signup formular.

API'et var nemt at forstå, layoutet var nemt at lave, og størstedelen af koden var let at skrive for mig. Der er nogle ting, jeg har overvejet at gøre anderledes visse steder. Jeg prøvede forskellige løsninger og fejlsøgte flere gange, men i de fleste tilfælde fungerede min kode ved første forsøg. Jeg brugte **NEXT dokumentattion** tit samt hjælpesider som **StackOverflow**, men tog ikke kode derfra og i stedet prøvet at oversætte det til min opgave.

Generelt var opgaven ikke svær for mig, og jeg havde masser af tid til overs, da jeg havde implementeret alle kravene. Den ekstra tid brugte jeg på at finjustere mit projekt.

## Noter
### Har arbejde med vinduet i 411 x 823 format og burde ses på den måde.
### API'en kører på localhost:4000.
### Jeg har brugt Firefox under hele projektet.