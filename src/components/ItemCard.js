export default function ItemCard({item}) {    
    return (

            <div className="group relative">
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={"https://us.123rf.com/450wm/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016/yehorlisnyi210400016.jpg?ver=6"}
                  alt={null}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={`Item/${item.ID}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {item.Name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{item.year}</p>
                </div>
              </div>
            </div>
    )
}