import { FaLeaf, FaClock, FaPiggyBank, FaGlobeAmericas } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <div className="container mx-auto px-4 py-16">
        <section className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-zinc-800 dark:text-zinc-100">
            Découvrez Viterr : Votre Compagnon de Voyage Intelligent
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-zinc-600 dark:text-zinc-300">
            Viterr révolutionne la façon dont vous planifiez vos voyages en
            combinant intelligemment différents modes de transport pour créer
            l'itinéraire parfait.
          </p>
        </section>

        <section className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: FaPiggyBank,
              title: "Économique",
              description:
                "Trouvez les trajets les moins chers en combinant astucieusement les modes de transport.",
            },
            {
              icon: FaLeaf,
              title: "Écologique",
              description:
                "Réduisez votre empreinte carbone en choisissant des options de voyage plus vertes.",
            },
            {
              icon: FaClock,
              title: "Rapide",
              description:
                "Optimisez votre temps de trajet grâce à nos algorithmes intelligents.",
            },
            {
              icon: FaGlobeAmericas,
              title: "Flexible",
              description:
                "Explorez diverses options de voyage adaptées à vos préférences et besoins.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:bg-zinc-800"
            >
              <feature.icon className="mx-auto mb-4 text-4xl text-blue-500" />
              <h3 className="mb-2 text-xl font-semibold text-zinc-800 dark:text-zinc-100">
                {feature.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300">
                {feature.description}
              </p>
            </div>
          ))}
        </section>

        <section className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-zinc-800 dark:text-zinc-100">
            Comment ça marche ?
          </h2>
          <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-lg dark:bg-zinc-800">
            <ol className="list-inside list-decimal space-y-4 text-left text-zinc-600 dark:text-zinc-300">
              <li>Entrez votre point de départ et votre destination</li>
              <li>
                Choisissez vos préférences de voyage (économique, écologique,
                rapide)
              </li>
              <li>
                Sélectionnez les modes de transport que vous souhaitez inclure
              </li>
              <li>
                Laissez Viterr calculer les meilleures combinaisons pour vous
              </li>
              <li>
                Comparez les options et choisissez celle qui vous convient le
                mieux
              </li>
              <li>Réservez votre voyage multimodal en quelques clics !</li>
            </ol>
          </div>
        </section>
      </div>
    </>
  );
}
