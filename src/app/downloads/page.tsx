import Link from "next/link"

const Page = async () => {

    return <div>
        <div className="text-center font-mono text-6xl m-4">file.mr-salih.org</div>
        <div className="text-center m-4 text-6xl ">Downloads</div>
        <div className="w-[800px] m-auto p-10">
        <div className="grid grid-cols-3 border-violet-600 border-4 p-4 rounded-md">
            <div><Link href="/download-files/ABox1.2.lbrn2" download className="font-bold">60x60x80 Box</Link></div>
            <div>A template for a small box used for candle holders.</div>
            <div><ul><li>Download the file</li><li>Open Lightburn</li><li>File -&gt; Open to open the file</li></ul></div>
        </div>

        <div className="grid grid-cols-3 border-violet-600 border-4 p-4 mt-4 rounded-md">
            <div><Link href="/download-files/AutomataBoxDesign.lbrn2" download className="font-bold">Automata Box Template</Link></div>
            <div>A template for a framework for Automata Box.</div>
            <div><ul><li>Download the file</li><li>Open Lightburn</li><li>File -&gt; Import to open the file</li></ul></div>
        </div>

        <div className="grid grid-cols-3 border-violet-600 border-4 p-4 mt-4 rounded-md">
            <div><Link href="/download-files/AccuracyPractice.lbrn2" download className="font-bold">Automata Accuracy Practice</Link></div>
            <div>File to practice accuracy placement of items.</div>
            <div><ul><li>Download the file</li><li>Open Lightburn</li><li>File -&gt; Import to open the file</li></ul></div>
        </div>

        </div>
    </div>
}



export default Page;