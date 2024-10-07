import { FaLeaf, FaClock, FaPiggyBank, FaGlobeAmericas } from 'react-icons/fa';

export default function Home() {
  return (
    <>
      <div className='container mx-auto px-4 py-16'>
        <section className='text-center mb-16'>
          <h2 className='text-4xl font-bold mb-4 text-zinc-800 dark:text-zinc-100'>
            Découvrez Viterr : Votre Compagnon de Voyage Intelligent
          </h2>
          <p className='text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto'>
            Viterr révolutionne la façon dont vous planifiez vos voyages en combinant intelligemment
            différents modes de transport pour créer l'itinéraire parfait.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { icon: FaPiggyBank, title: "Économique", description: "Trouvez les trajets les moins chers en combinant astucieusement les modes de transport." },
            { icon: FaLeaf, title: "Écologique", description: "Réduisez votre empreinte carbone en choisissant des options de voyage plus vertes." },
            { icon: FaClock, title: "Rapide", description: "Optimisez votre temps de trajet grâce à nos algorithmes intelligents." },
            { icon: FaGlobeAmericas, title: "Flexible", description: "Explorez diverses options de voyage adaptées à vos préférences et besoins." },
          ].map((feature, index) => (
            <div key={index} className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
              <feature.icon className="text-4xl mb-4 text-blue-500 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-zinc-800 dark:text-zinc-100">{feature.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-300">{feature.description}</p>
            </div>
          ))}
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-zinc-800 dark:text-zinc-100">
            Comment ça marche ?
          </h2>
          <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8">
            <ol className="list-decimal list-inside text-left space-y-4 text-zinc-600 dark:text-zinc-300">
              <li>Entrez votre point de départ et votre destination</li>
              <li>Choisissez vos préférences de voyage (économique, écologique, rapide)</li>
              <li>Sélectionnez les modes de transport que vous souhaitez inclure</li>
              <li>Laissez Viterr calculer les meilleures combinaisons pour vous</li>
              <li>Comparez les options et choisissez celle qui vous convient le mieux</li>
              <li>Réservez votre voyage multimodal en quelques clics !</li>
            </ol>
          </div>
        </section>
      </div>
    </>
  );
}
